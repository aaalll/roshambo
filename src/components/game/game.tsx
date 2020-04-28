import React, { useContext, useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import RepeatIcon from '@material-ui/icons/Repeat';


import CancelIcon from '@material-ui/icons/Cancel';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LaunchIcon from '@material-ui/icons/Launch';

import history from 'utils/history';
import { firstMove, secondMove, restartGame, closeGame } from 'store/sagas/sagas';
import { StoreContext } from 'store/reducers/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    media: {
      [theme.breakpoints.down('md')]: {
        backgroundColor: 'red',
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    avatar: {
      backgroundColor: 'red'
    }
  })
);

// import './game.css';

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

const Game: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  let { id } = useParams();
  const classes = useStyles();
  const isNullHash = (hash: any) => {
    return !hash || !Number.parseInt(hash, 16);
  }

  useEffect(() => {
    if (!state.user) history.push('/');
  });

  const [moved, setMoved] = useState<boolean>(false);

  const moveFirst = async (
    id: string,
    move: number,
    challenger: string,
    by: number
  ) => {
    setMoved(true);
    await firstMove({ dispatch, state })(id, move, challenger, by);
    setMoved(false);
  };

  const moveSecond = async (id: string, challenger: string, by: number) => {
    setMoved(true);
    await secondMove({ dispatch, state })(id, challenger, by);
    setMoved(false);
  };

  const gameRestart = async (id: string) => {
    await restartGame({ dispatch, state })(id);
  };
  const gameClose = async (id: string) => {
    await closeGame({ dispatch, state })(id);
    history.push('/');
  };
  const gameNew = async (id: string) => {
    await closeGame({ dispatch, state })(id);
    history.push('/');
  };
  const currentGame: any = state.games.rows.find((el: any) => {
    return String(el.id) === id;
  });

  if (!currentGame) {
    history.push('/');
    return <div />;
  }
  console.log('currentGame', currentGame.winner, currentGame.host, currentGame);

  return (
    <Grid container className={classes.media}>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <Card className={classes.root}>
            <CardHeader title={currentGame.host} />
            <CardContent>
              {currentGame.accepted === 0 && (
                <Typography variant="body2" color="textSecondary" component="p">
                  Hi, <br /> I am waiting your Join
                </Typography>
              )}
              {!isNullHash(currentGame.ph_move_hash) &&
                isNullHash(currentGame.pc_move_hash) && (
                  <Typography component="p">
                    waiting on opponent move to confirm own move...
                  </Typography>
                )}
              {!isNullHash(currentGame.ph_move_hash) &&
                !isNullHash(currentGame.pc_move_hash) &&
                currentGame.ph_move === 0 && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Please
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        moveSecond(currentGame.id, currentGame.challenger, 1);
                      }}
                    >
                      confirm your move...
                    </Button>
                  </Typography>
                )}
              {currentGame.ph_move !== currentGame.ph_move_nonce && (
                <Typography variant="body2" color="textSecondary" component="p">
                  Move confirmed: <GameIcon move={currentGame.ph_move} />
                </Typography>
              )}
              {currentGame.ph_move !== 0 && currentGame.ph_move === currentGame.ph_move_nonce && (
                <Typography variant="body2" color="textSecondary" component="p">
                  I was too lazy to confirm a move :)
                </Typography>
              )}
              {currentGame.ph_move === 0 && currentGame.ph_move === currentGame.ph_move_nonce && (
                <Typography variant="body2" color="textSecondary" component="p">
                  You turn :)
                </Typography>
              )}
              {isNullHash(currentGame.ph_move_hash) && (
                <Typography variant="body2" color="textSecondary" component="p">
                  <IconButton
                    aria-label="1"
                    disabled={moved}
                    onClick={() => {
                      moveFirst(currentGame.id, 1, currentGame.challenger, 1);
                    }}
                  >
                    <GameIcon move={1} />
                  </IconButton>
                  <IconButton
                    aria-label="2"
                    disabled={moved}
                    onClick={() => {
                      moveFirst(currentGame.id, 2, currentGame.challenger, 1);
                    }}
                  >
                    <GameIcon move={2} />
                  </IconButton>
                  <IconButton
                    aria-label="3"
                    disabled={moved}
                    onClick={() => {
                      moveFirst(currentGame.id, 3, currentGame.challenger, 1);
                    }}
                  >
                    <GameIcon move={3} />
                  </IconButton>
                </Typography>
              )}
              {currentGame.winner !== 'none' &&
                currentGame.winner === currentGame.host && (
                  <Typography component="p">YOU WIN</Typography>
                )}
              {currentGame.winner !== 'none' &&
                currentGame.winner !== currentGame.host && (
                  <Typography component="p">YOU LOSE</Typography>
                )}
              {currentGame.winner === 'none' &&
                currentGame.pc_move &&
                currentGame.ph_move && (
                  <Typography component="p">TIE</Typography>
                )}
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <Card className={classes.root}>
            <CardHeader
              avatar={<SportsEsportsIcon />}
              action={
                <IconButton aria-label="settings" onClick={() => {
                  gameRestart(currentGame.id);
                }}>
                  <RepeatIcon />
                </IconButton>
              }
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
                          target="_blank" rel="noopener noreferrer"
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
                          target="_blank" rel="noopener noreferrer"
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
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={() => {
                gameNew(currentGame.id);
              }}>
                <LaunchIcon />
              </IconButton>
              <IconButton aria-label="share" onClick={() => {
                gameClose(currentGame.id);
              }}>
                <CancelIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <Card className={classes.root}>
            <CardHeader title={currentGame.challenger} />
            <CardContent>
              {currentGame.accepted === 0 && (
                <Typography component="p">
                  Looking opportunity to Join
                </Typography>
              )}
              {!isNullHash(currentGame.pc_move_hash) &&
                isNullHash(currentGame.ph_move_hash) && (
                  <Typography component="p">
                    waiting for oponent move...
                  </Typography>
                )}

              {!isNullHash(currentGame.pc_move_hash) &&
                isNullHash(currentGame.ph_move_hash) && (
                  <Typography component="p">
                    I am waiting your turn to confirm my move...
                  </Typography>
                )}
              {isNullHash(currentGame.pc_move_hash) &&
                !isNullHash(currentGame.ph_move_hash) && (
                  <Typography component="p">
                    waiting for opponent move...
                  </Typography>
                )}
              {!isNullHash(currentGame.ph_move_hash) &&
                !isNullHash(currentGame.pc_move_hash) && currentGame.pc_move === 0 && (
                  <Typography component="p">
                    I'll confirm my move asap...
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

              {currentGame.winner !== 'none' &&
                currentGame.winner === currentGame.challenger && (
                  <Typography component="p">YOU WIN</Typography>
                )}
              {currentGame.winner !== 'none' &&
                currentGame.winner !== currentGame.challenger &&
                currentGame.winner !== 'self' && (
                  <Typography component="p">YOU LOSE</Typography>
                )}
              {currentGame.winner === 'none' &&
                currentGame.pc_move &&
                currentGame.ph_move && (
                  <Typography component="p">TIE</Typography>
                )}
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Game;
