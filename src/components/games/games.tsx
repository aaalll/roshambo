import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';

import Results from './results';
import Active from './active';
import Game from '../game';
import Call from '../call';

import history from 'utils/history';
import { StoreContext } from 'store/reducers/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '75%',
      minHeight: '300px',
      margin: '50px auto',
      background: 'rgba(244, 246, 243, 0.25)',
      opacity: '0.9',
      boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.15)',
    }
  })
);


const Games: React.FC = () => {
  const { state } = useContext(StoreContext);
  const classes = useStyles();
  const [gameId, setGameId] = useState<number>(0);
  const [gameHost, setGameHost] = useState<string>('');

  useEffect(() => {
    if (!state.user) history.push('/');
  });

  const handleGame = (id: string) => {
    history.push(`/games/${id}`);
  };

  const openGame = (gameId: number, host: string) => {
    console.log('open game', gameId, host, state);

    setGameId(gameId);
    setGameHost(host);
  }

  const isClose = (currentGame: any) => {
    console.log('currentGame', currentGame, currentGame.winner !== 'none', currentGame.winner === 'none' &&
      !currentGame.pc_move &&
      !currentGame.ph_move);
    if (currentGame.winner !== 'none' ||
      (currentGame.winner === 'none' &&
        currentGame.pc_move &&
        currentGame.ph_move)
    ) {

      return true
    }
    return false
  }


  return (
    <Grid container className={classes.container}>
      <Active games={state.games ? state.games.rows.filter((element) => {
        return !isClose(element)
      }) : []} openGame={openGame} />
      <Results games={state.games ? state.games.rows.filter((element) => {
        return isClose(element)
      }) : []} user={state.user ? state.user.name : ''} />
      {(state.user && gameHost && state.user.name === gameHost) && <Game id={gameId} />}
      {(state.user && gameHost && state.user.name !== gameHost) && <Call id={gameId} />}

    </Grid>
  );
};

export default Games;
