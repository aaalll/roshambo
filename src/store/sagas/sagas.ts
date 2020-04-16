import http from 'services/http';
import {
  setWalletData,
  setStatus,
  logout,
  setGamesData,
  setAccount,
  setAccountKey,
  setSource,
  setMessage
} from 'store/actions/actions';
import { StoreProps } from 'store/reducers/reducer';
import EOSIOClient from '../../utils/EOSIOClient';

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
      await getGameChallenges({ dispatch, state:{...state, client:eosClient} })();

      // const loadedGames = await eosClient.getGameChallenges();

      // if (!loadedGames.error) {
      //   dispatch(setGamesData(loadedGames.games));
      //   // getGameChallenges({ dispatch, state })()

      // } else {
      //   dispatch(setMessage({ type: 'error', text: loadedGames.error }));
      // }
      // dispatch(setStatus('loaded'));

      // setTimeout(()=>{
      //   getGameChallenges({ dispatch, state })();
      // }, 5000)
      return true;
    } catch (err) {
      console.log('loadWallet',  err);
      
      dispatch(setStatus('error'));
      dispatch(setWalletData(eosClient));
      return false;
    }
  };
}

// export function loadWallet({ dispatch, state }: StoreProps) {

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
    console.log('getGameChallenges', state);

    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      const loadedGames = await eosClient.getGameChallenges();
      console.log('getGameChallenges loadedGames', loadedGames);
      if (!loadedGames.error) {
        dispatch(setGamesData(loadedGames.games));
      } else {
        dispatch(setMessage({ type: 'error', text: loadedGames.error }));
      }
      dispatch(setStatus('loaded'));
      setTimeout(() => {
        // getGameChallenges({ dispatch, state })();
      }, 5000);
      return true;
    } catch (err) {
      console.log('getGameChallenges err', err);
      dispatch(setStatus('error'));
      return false;
    }
  };
}

export function restartGame({ dispatch, state }: StoreProps) {
  return async function (game: any): Promise<boolean | null> {
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      await eosClient.restartGame(game.id, game.host);

      const loadedGames = await eosClient.getGameChallenges();
      if (!loadedGames.error) {
        dispatch(setGamesData(loadedGames.games));
      } else {
        dispatch(setMessage({ type: 'error', text: loadedGames.error }));
      }
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
        challenger === state.user.name ? 1 : 2
      );

      if (move01.error) {
        dispatch(setMessage({ type: 'error', text: move01.error }));
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
        challenger === state.user.name ? 1 : 2
      );

      if (move02.error) {
        dispatch(setMessage({ type: 'error', text: move02.error }));
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
    console.log('sagas closeGame');
    
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      await eosClient.closeGame(id);

      const loadedGames = await eosClient.getGameChallenges();
      if (!loadedGames.error) {
        dispatch(setGamesData(loadedGames.games));
      } else {
        dispatch(setMessage({ type: 'error', text: loadedGames.error }));
      }
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}


export function createGame({ dispatch, state }: StoreProps) {
  return async function (challenger: string): Promise<boolean | null> {
    console.log('sagas createGame', challenger);
    
    dispatch(setStatus('loading'));
    let eosClient = state.client;
    try {
      const resp = await eosClient.createGame(challenger);
      console.log('sagas createGame resp', resp);


      const loadedGames = await eosClient.getGameChallenges();
      if (!loadedGames.error) {
        dispatch(setGamesData(loadedGames.games));
      } else {
        dispatch(setMessage({ type: 'error', text: loadedGames.error }));
      }
      dispatch(setStatus('loaded'));
      return true;
    } catch (err) {
      dispatch(setStatus('error'));
      return false;
    }
  };
}


// export function getGame({ dispatch, state }: StoreProps) {
//   return async function (id: any): Promise<boolean | null> {
//     if (!state.user) {
//       return false;
//     }
//     dispatch(setStatus('loading'));
//     let eosClient = state.client;
//     try {
//       // const move02 = await eosClient.move02(
//       //   game.id,
//       //   game.challenger,
//       //   game.step === state.user.name ? 1 : 2
//       // );

//       // if (move02.error) {
//       //   dispatch(setMessage({ type: 'error', text: move02.error }));
//       }
//       dispatch(setStatus('loaded'));
//       return true;
//     } catch (err) {
//       dispatch(setStatus('error'));
//       return false;
//     }
//   };
// }

// export function changePassword({dispatch, state}: StoreProps) {
//   return async function(passwords: {
//     oldPassword: string;
//     newPassword: string;
//   }): Promise<boolean> {
//     try {
//       await http({
//         method: 'PUT',
//         url: '/user/password',
//         data: passwords,
//         accessToken: state.accessToken
//       });

//       return true;
//     }
//     catch (err) {
//       if (err.response && err.response.status === 401) {
//         dispatch(logout());
//        }
//        if (err.response && err.response.status === 403) {
//         return false;
//        }

//       return Promise.reject();
//     }
//   }
// }

export function changeAccountInfo({ dispatch, state }: StoreProps) {
  return async function (accountInfo: {
    id: number;
    name: string;
    size: string;
  }): Promise<{
    name: string;
    size: string;
  }> {
    try {
      const data = await http({
        method: 'PUT',
        url: '/account/' + accountInfo.id,
        data: accountInfo,
        accessToken: state.accessToken
      });

      dispatch(setAccount(data.account));

      return {
        name: data.account.name,
        size: data.account.size
      };
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
      }
      return Promise.reject();
    }
  };
}

export function changeAccountKey({ dispatch, state }: StoreProps) {
  return async function (accountInfo: {
    accountId: number;
  }): Promise<{
    key: string;
  }> {
    try {
      const { data } = await http({
        method: 'POST',
        url: '/account/' + accountInfo.accountId + '/key',
        accessToken: state.accessToken
      });

      const key: string = data.key;

      dispatch(setAccountKey(key));

      return {
        key: data.key
      };
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
      }
      return Promise.reject();
    }
  };
}

export function getAccountKey({ dispatch, state }: StoreProps) {
  return async function (accountInfo: {
    accountId: number;
  }): Promise<{
    key: string;
  }> {
    try {
      const { data } = await http({
        method: 'GET',
        url: '/account/' + accountInfo.accountId + '/key',
        accessToken: state.accessToken
      });

      const key: string = data;

      dispatch(setAccountKey(key));

      return {
        key: data
      };
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
      }
      return Promise.reject();
    }
  };
}

export function getSourceCode({ dispatch, state }: StoreProps) {
  return async function (accountInfo: {
    accountId: number;
    platform: string;
    domain: string;
  }): Promise<{
    source: string;
  }> {
    try {
      const data = await http({
        method: 'post',
        url: '/account/' + accountInfo.accountId + '/source',
        data: {
          accountId: accountInfo.accountId,
          platform: accountInfo.platform,
          domain: accountInfo.domain
        },
        accessToken: state.accessToken
      });

      const source: string = data.source;

      dispatch(setSource(source));
      return {
        source
      };
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
      }
      return Promise.reject();
    }
  };
}

export function downloadSourceCode({ dispatch, state }: StoreProps) {
  return async function (accountInfo: {
    accountId: number;
    platform: string;
    domain: string;
  }): Promise<{
    source: string;
  }> {
    try {
      const data = await http({
        method: 'post',
        url: '/account/' + accountInfo.accountId + '/download',
        data: {
          accountId: accountInfo.accountId,
          platform: accountInfo.platform,
          domain: accountInfo.domain
        },
        accessToken: state.accessToken
      });

      const source: string = data.source;

      const url = window.URL.createObjectURL(new Blob([source]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file.${accountInfo.platform}`);
      document.body.appendChild(link);
      link.click();
      return {
        source
      };
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(logout());
      }
      return Promise.reject();
    }
  };
}
