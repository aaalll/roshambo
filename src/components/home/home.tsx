import React, { useContext, useState, ChangeEvent, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  InputAdornment,
  FormControl,
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
      margin: theme.spacing(1)
    },
    gameIcons: {
      fontSize: '100px',
      marginLeft: '0px',
      color: '#f0f',
      background: 'none',
      boxShadow: 'none',
      padding: '0px 20px'
    },
    gameIcon: {
      margin: '10px'
    },
    home: {},
    game: {
      maxWidth: 345,
      margin: 'auto'
    }
  })
);

type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const UserInput: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();
  const [challenger, setChallenger] = useState<string>('');
  const handleChangeChallenger = (e: InputEvent) =>
    setChallenger(e.target.value);
  const localPlayers = localStorage.getItem('players');
  const recentPlayers: string[] =
    localPlayers != null && localPlayers.length > 0
      ? localPlayers.split(',')
      : [];
  const createNewGame = () => {
    createGame({ dispatch, state })(challenger);
    //
  };
  const handleClick = () => {
    console.info('You clicked the Chip.');
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
    <Card className={classes.game}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            New game
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Please enter opponents <b>EOS</b> account name and press create the{' '}
            <b>game</b>. Its totally <b>free</b>
          </Typography>
          {recentPlayers.length > 0 ? 'Recent players: ' : ''}
          {recentPlayers.map((value: any, index: number) => {
            return (
              <Chip
                icon={<FaceIcon />}
                label={value}
                key={index}
                onClick={() => {
                  setChallenger(value);
                }}
              />
            );
          })}

          <FormControl className={classes.margin}>
            <TextField
              className={classes.margin}
              error={challenger.length < 10}
              id="input-with-icon-textfield"
              label="Name"
              value={challenger}
              helperText={validateName(challenger)}
              onChange={handleChangeChallenger}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={createNewGame}
          disabled={challenger.length < 10}
        >
          Create game
        </Button>
      </CardActions>
    </Card>
  );
};
const Home: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const classes = useStyles();

  // useEffect(() => {

  // });
  return (
    <Container maxWidth="lg" className={classes.home}>
      <div className={classes.gameIcons}>
        <i className={'fal fa-hand-rock ' + classes.gameIcon}></i>
        <i className={'fal fa-hand-paper ' + classes.gameIcon}></i>
        <i className={'fal fa-hand-scissors ' + classes.gameIcon}></i>
      </div>
      {!state.user ? 'connect' : <UserInput />}
    </Container>
  );
};

export default Home;
