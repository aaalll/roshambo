import {
  setWalletData,
  setStatus,
  setRefresh,
  logout,
  setGamesData,
  setTop,
  setMessage
} from 'store/actions/actions';
import { StoreProps } from 'store/reducers/reducer';
import EOSIOClient from '../../utils/EOSIOClient';
import axios from 'axios';

export function loadWallet({ dispatch, state }: StoreProps) {
  return async function (): Promise<boolean | null> {
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    if (!eosClient) {
      eosClient = new EOSIOClient('roshambo', state.environment);
    }
    try {
      await eosClient.connect();
      const authData = eosClient.getAccount();

      dispatch(setWalletData(eosClient, authData));
      dispatch(setStatus('loaded'));
      return await getGameChallenges({ dispatch, state:{...state, client:eosClient} })();
    } catch (err) {
      dispatch(setStatus('error'));
      dispatch(setWalletData(eosClient));
      return false;
    }
  };
}


export function logoutWallet({ dispatch, state }: StoreProps) {
  return async function (): Promise<boolean | null> {
    let eosClient = state.client;
    if (eosClient) {
      await eosClient.logout();
    }
    dispatch(logout());
    return true;
  };
}

export function getGameChallenges({ dispatch, state }: StoreProps) {
  return async function (): Promise<boolean | null> {
    
    if(state.refresh === 'loading'){
      return true;
    }
      
    dispatch(setRefresh('loading'));
    let eosClient = state.client;
    try {
      const loadedGames = await eosClient.getGameChallenges();
      const calledGames = await eosClient.getMyGamesCalls();
      if (!loadedGames.error && !calledGames.error) {
        const newList = {
          more: loadedGames.games.more || calledGames.calls.more,
          next_key: loadedGames.games.next_key + ' ' + calledGames.calls.next_key,
          rows: loadedGames.games.rows.concat(calledGames.calls.rows),
        }
        dispatch(setGamesData(newList ));
      } else {
        dispatch(setMessage({ type: 'error', text: loadedGames.error || calledGames.error }));
        dispatch(setRefresh('loaded'));
      }
      return true;
    } catch (err) {
      dispatch(setRefresh('error'));
      return false;
    }
  };
}

export function restartGame({ dispatch, state }: StoreProps) {
  return async function (id: string): Promise<boolean | null> {
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      await eosClient.restartGame(id);
      await getGameChallenges({ dispatch, state })();
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}

export function firstMove({ dispatch, state }: StoreProps) {
  return async function (
    id: string,
    move: number,
    challenger: string,
    by: number
  ): Promise<boolean | null> {
    if (!state.user) {
      return false;
    }

    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
     
      const move01 = await eosClient.move01(
        id,
        move,
        challenger,
        challenger === state.user.name ? 2 : 1
      );

      if (move01.error) {
        dispatch(setMessage({ type: 'error', text: move01.error.message || 'Fail to make move' }));
      } else {
        await getGameChallenges({ dispatch, state })();
      }
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}

export function secondMove({ dispatch, state }: StoreProps) {
  return async function (
    id: string,
    challenger: string,
    by: number
  ): Promise<boolean | null> {
    if (!state.user) {
      return false;
    }

    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      const move02 = await eosClient.move02(
        id,
        challenger,
        challenger === state.user.name ? 2 : 1
      );

      if (move02.error) {
        dispatch(setMessage({ type: 'error', text: move02.error.message }));
      } else {
        await getGameChallenges({ dispatch, state })();
      }
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}

export function closeGame({ dispatch, state }: StoreProps) {
  return async function (id: string): Promise<boolean | null> {
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      await eosClient.closeGame(id);
      await getGameChallenges({ dispatch, state })();
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}

export function loadTop({ dispatch, state }: StoreProps) {
  return async function (): Promise<boolean | null> {
    console.log('loadTop 0');
    // if (state.status !== 'loaded') {

    // }
    // setTimeout(() => {
    //   loadTop({ dispatch, state })();
    // }, 5000);


    dispatch(setStatus('loading'));
    console.log('loadTop 1');
    try {
      const response = await axios('/api/v1/top100');
      console.log('loadTop response', response);
      const responseOK = response && response.status === 200 && response.statusText === 'OK';
      if (responseOK) {
          let data = await response.data.table_winners;
          dispatch(setTop(data));
          dispatch(setStatus('loaded'));
          return true;
      } else {
        console.log('loadTop err', responseOK);
        dispatch(setTop([]));
        dispatch(setStatus('error'));
        return false;
      }
    } catch (err) {
      console.log('loadTop err', err);
      dispatch(setTop([]));
      dispatch(setStatus('error'));
      return false;
    }
  };
}

export function createGame({ dispatch, state }: StoreProps) {
  return async function (challenger: string): Promise<boolean | null> {
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      await eosClient.createGame(challenger);
      await getGameChallenges({ dispatch, state })();
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}
