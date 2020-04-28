import React, { useContext, useState, ChangeEvent } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography
} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { StoreContext } from 'store/reducers/reducer';
import { createGame } from 'store/sagas/sagas';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: '8px auto',
      width: '100%',
      fontSize: '13px'
    },
    gameIcons: {
      fontSize: '100px',
      marginLeft: '0px',
      color: '#fff',
      background: 'none',
      boxShadow: 'none',
      padding: '0px 20px'
    },
    gameIcon: {
      margin: '10px'
    },
    home: {
      margin: 'auto'
    },
    game: {
      maxWidth: 345,
      margin: 'auto',
      color: '#fff',
      fontSize: '11px'
    },
    header: {
      fontFamily: 'ProximaNova, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 'bolder',
      fontSize: '20px'
    },
    chip: {
      fontSize: '11px'
    },
    content: {
      width: '100%',
      fontSize: '11px'
    },
    challenger:{
      height: '78px',
    },
    InputLabelProps: {
      fontSize: '13px',
      color: '#fff'
    },
    button: {
      backgroundColor: 'white',
      borderRadius: '20px',
      margin: '10px',
      padding: '10px 20px',
      color: '#218838'
    }
  })
);

type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const UserInput: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();
  const [challenger, setChallenger] = useState<string>('');
  const [validateError, setValidateError] = useState<boolean>(false);

  const handleChangeChallenger = (e: InputEvent) => {
    setValidateError(true);
    setChallenger(e.target.value);
  };
  const localPlayers = localStorage.getItem('players');
  
  const recentPlayers: string[] =
    localPlayers != null && localPlayers.length > 0
      ? localPlayers.split(',').concat(state.environment.botName).filter((v, i, arr) => arr.indexOf(v)==i)
      : [state.environment.botName];
  const createNewGame = () => {
    createGame({ dispatch, state })(challenger);
  };

  const validateName = (challenger: string) => {
    if (!challenger) {
      return 'Name required';
    }
    if (challenger.length < 10) {
      return 'Name should be at least 10 symbol length.';
    }
    return '';
  };

  return (
    <div className={classes.game}>
      <Typography gutterBottom component="p" className={classes.header}>
        Please enter opponents <b>EOS</b> account name and press create the{' '}
        <b>game</b>. Its totally <b>free</b>
      </Typography>
      <Typography gutterBottom component="div" className={classes.content}>
        {recentPlayers.length > 0 ? 'Recent players: ' : ''}
        {recentPlayers.map((value: any, index: number) => {
          return (
            <Chip
              icon={<FaceIcon />}
              label={value}
              key={index}
              className={classes.chip}
              onClick={() => {
                setChallenger(value);
              }}
            />
          );
        })}
      </Typography>

      <FormControl className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.challenger}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <TextField
              error={validateError && challenger.length < 10}
              id="input-with-icon-textfield"
              label="Enter EOS account would like cause for a fight"
              value={challenger}
              helperText={validateName(challenger)}
              onChange={handleChangeChallenger}
              fullWidth
              InputLabelProps={{ className: classes.InputLabelProps }}
            />
          </Grid>
        </Grid>
      </FormControl>

      <Button
        size="small"
        color="primary"
        onClick={createNewGame}
        disabled={challenger.length < 10}
        className={classes.button}
      >
        Create game
      </Button>
    </div>
  );
};
const Home: React.FC = () => {
  const { state } = useContext(StoreContext);
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.home}>
      {!state.user ? 'connect' : <UserInput />}
    </Container>
  );
};

export default Home;
