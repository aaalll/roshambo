import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import history from 'utils/history';
import {
  firstMove,
  secondMove,
} from 'store/sagas/sagas';
import { StoreContext } from 'store/reducers/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    media: {
      opacity: 0.9,
      [theme.breakpoints.down('md')]: {
        //
      },
      maxWidth: '1450px',
      margin: 'auto',
      paddingBottom: '20px',
    },
    paper: {
      padding: 0,
      textAlign: 'center',
      maxWidth: '450px',
      margin: 'auto',
      color: theme.palette.text.secondary
    },
  })
);

interface GameIconProps {
  move: number;
}

const GameIcon: React.SFC<GameIconProps> = (props: any) => {
  let res: any;
  switch (props.move) {
    case 1:
      res = <i className="fal fa-hand-rock"></i>;
      break;
    case 2:
      res = <i className="fal fa-hand-paper"></i>;
      break;
    case 3:
      res = <i className="fal fa-hand-scissors"></i>;
      break;
    default:
      res = <span />;
      break;
  }
  return res;
};

interface CallProps {
  id: number;
}


const Call: React.FC<CallProps> = (props) => {
  const { state, dispatch } = useContext(StoreContext);
  let { id } = props;
  const classes = useStyles();
  // const nullHash =
  //   '0000000000000000000000000000000000000000000000000000000000000000';

  const isNullHash = (hash: any) => {
    return !hash || !Number.parseInt(hash, 16);
  };

  console.log('id', id);
  if (!id) {
    return <div />;
  }

  const moveFirst = (
    id: string,
    move: number,
    challenger: string,
    by: number
  ) => {
    firstMove({ dispatch, state })(id, move, challenger, by);
  };

  const moveSecond = (id: string, challenger: string, by: number) => {
    secondMove({ dispatch, state })(id, challenger, by);
  };

  const currentGame: any = state.games.rows.find((el: any) => {
    return el.id === id;
  });

  if (!currentGame) {
    return <div />;
  }
  console.log('currentGame', currentGame.winner, currentGame.host, currentGame);

  const renderResult = (currentGame: any, challenger: boolean) => {
    let result: string = '';
    const winner: string = challenger ? currentGame.challenger : currentGame.host;

    if (currentGame.winner !== 'none' && currentGame.winner === winner && currentGame.winner !== 'self') {
      result = 'YOU WIN';
    }
    if (
      currentGame.winner !== 'none' &&
      currentGame.winner !== winner &&
      currentGame.winner !== 'self'
    ) {
      result = 'YOU LOSE';
    }
    if (currentGame.winner === 'none' && currentGame.pc_move && currentGame.ph_move) {
      result = 'TIE';
    }
    if (result) {
      return <Typography component="p">result</Typography>
    } else {
      return null
    }
  };

  return (
    <Grid container className={classes.media}>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <Card className={classes.root}>
            <CardHeader title={currentGame.host} />
            <CardContent>
              {isNullHash(currentGame.ph_move_hash) &&
                isNullHash(currentGame.pc_move_hash) && (
                  <Typography component="p">I'll move now...</Typography>
                )}
              {!isNullHash(currentGame.pc_move_hash) &&
                isNullHash(currentGame.pc_move_hash) && (
                  <Typography component="p">I'll move now...</Typography>
                )}
              {isNullHash(currentGame.pc_move_hash) &&
                !isNullHash(currentGame.ph_move_hash) && (
                  <Typography component="p">
                    waiting for oponent move...
                  </Typography>
                )}
              {!isNullHash(currentGame.ph_move_hash) &&
                !isNullHash(currentGame.pc_move_hash) &&
                currentGame.ph_move === 0 && (
                  <Typography component="p">
                    I'll confirm my move asap...
                  </Typography>
                )}

              {currentGame.ph_move !== currentGame.ph_move_nonce && (
                <Typography variant="body2" color="textSecondary" component="p">
                  Move confirmed: <GameIcon move={currentGame.ph_move} />
                </Typography>
              )}
              {currentGame.ph_move === currentGame.ph_move_nonce && (
                <Typography variant="body2" color="textSecondary" component="p">
                  I was too lazy to confirm a move :)
                </Typography>
              )}

              {renderResult(currentGame, false)}

            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <Card className={classes.root}>
            <CardHeader
              avatar={<SportsEsportsIcon />}
              title="History"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                game owner {currentGame.host} started game with
                {currentGame.challenger}
              </Typography>
              {currentGame.accepted !== 0 && (
                <Typography variant="body2" color="textSecondary" component="p">
                  <b>{currentGame.challenger}</b> accepted
                </Typography>
              )}

              {!isNullHash(currentGame.ph_move_hash) && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {currentGame.host} sent move hash:{' '}
                  <b>{currentGame.ph_move_hash}</b>
                </Typography>
              )}
              {!isNullHash(currentGame.pc_move_hash) && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {currentGame.challenger} sent move hash:{' '}
                  <b>{currentGame.pc_move_hash}</b>
                </Typography>
              )}

              {!isNullHash(currentGame.pc_move_hash) &&
                !isNullHash(currentGame.ph_move_hash) &&
                currentGame.pc_move !== 0 && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>{currentGame.challenger}</b> Confirmed Move{' '}
                    <GameIcon move={currentGame.pc_move} /> <br />
                    {currentGame.pc_move !== currentGame.pc_move_nonce && (
                      <span>
                        move: {currentGame.pc_move}, nonce:
                        {currentGame.pc_move_nonce} = {currentGame.pc_move}
                        {currentGame.pc_move_nonce}
                        <a
                          href={`https://md5calc.com/hash/sha256/${currentGame.pc_move}${currentGame.pc_move_nonce}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          check
                        </a>
                      </span>
                    )}
                    {currentGame.pc_move === currentGame.pc_move_nonce && (
                      <span>[ Move not confirmed and time expired ]</span>
                    )}
                  </Typography>
                )}

              {!isNullHash(currentGame.pc_move_hash) &&
                !isNullHash(currentGame.ph_move_hash) &&
                currentGame.ph_move !== 0 && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>{currentGame.host}</b> Confirmed Move{' '}
                    <GameIcon move={currentGame.ph_move} />
                    <br />
                    {currentGame.ph_move !== currentGame.ph_move_nonce && (
                      <span>
                        move: {currentGame.ph_move}, nonce:
                        currentGame.ph_move_nonce} = {currentGame.ph_move}{' '}
                        {currentGame.ph_move_nonce}
                        <a
                          href={`https://md5calc.com/hash/sha256/${currentGame.ph_move}${currentGame.ph_move_nonce}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          check
                        </a>
                        ]
                      </span>
                    )}
                    {currentGame.ph_move === currentGame.ph_move_nonce && (
                      <span>[ Move not confirmed and time expired ]</span>
                    )}
                  </Typography>
                )}
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <Card className={classes.root}>
            <CardHeader title={currentGame.challenger} />
            <CardContent>
              {!isNullHash(currentGame.pc_move_hash) &&
                isNullHash(currentGame.ph_move_hash) && (
                  <Typography component="p">
                    waiting on oponent move to confirm own move...
                  </Typography>
                )}

              {!isNullHash(currentGame.pc_move_hash) &&
                !isNullHash(currentGame.ph_move_hash) &&
                currentGame.pc_move === 0 && (
                  <Typography component="p">
                    Please
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        moveSecond(currentGame.id, currentGame.challenger, 2);
                      }}
                    >
                      confirm your move...
                    </Button>
                  </Typography>
                )}

              {!isNullHash(currentGame.ph_move_hash) &&
                !isNullHash(currentGame.pc_move_hash) &&
                currentGame.pc_move !== 0 &&
                currentGame.pc_move !== currentGame.pc_move_nonce && (
                  <Typography component="p">
                    Move confirmed: <GameIcon move={currentGame.pc_move} />
                  </Typography>
                )}

              {!isNullHash(currentGame.ph_move_hash) &&
                !isNullHash(currentGame.pc_move_hash) &&
                currentGame.pc_move !== 0 &&
                currentGame.pc_move === currentGame.pc_move_nonce && (
                  <Typography component="p">
                    I was too lazy to confirm a move :)
                  </Typography>
                )}

              {isNullHash(currentGame.pc_move_hash) && (
                <Typography variant="body2" color="textSecondary" component="p">
                  <IconButton
                    aria-label="1"
                    onClick={() => {
                      moveFirst(currentGame.id, 1, currentGame.challenger, 2);
                    }}
                  >
                    <GameIcon move={1} />
                  </IconButton>
                  <IconButton
                    aria-label="2"
                    onClick={() => {
                      moveFirst(currentGame.id, 2, currentGame.challenger, 2);
                    }}
                  >
                    <GameIcon move={2} />
                  </IconButton>
                  <IconButton
                    aria-label="3"
                    onClick={() => {
                      moveFirst(currentGame.id, 3, currentGame.challenger, 2);
                    }}
                  >
                    <GameIcon move={3} />
                  </IconButton>
                </Typography>
              )}
              {renderResult(currentGame, true)}

            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Call;
