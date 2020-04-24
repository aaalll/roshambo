import history from 'utils/history';

import { ResponseTable } from 'models/response-table/response-table.model';
import SnackbarMessage from 'models/message/message.model';

export const SET_WALLET = '@auth/SET_WALLET';
export const SET_STATUS = '@global/SET_STATUS';
export const SET_MESSAGE = '@global/SET_MESSAGE';
export const SET_GAMES = '@games/SET_GAMES';
export const SET_CALLS = '@games/SET_CALLS';
export const SET_NEWDATA = '@games/SET_NEWDATA';
export const SET_TOP = '@games/SET_TOP';
export const SET_REFRESH = '@global/SET_REFRESH';

export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const SET_MODAL = '@global/SET_MODAL';


export const login = () => ({
  type: LOGIN
});

export const logout = () => {
  history.push('/');
  return {
    type: LOGOUT,
    payload: {
      user: null,
      account: {},
      accessToken: ''
    }
  };
};

export const setModal = (modalType: string = '') => ({
  type: SET_MODAL,
  payload: {
    modalType
  }
});

export const setWalletData = (client: any = null, user: any = null) => ({
  type: SET_WALLET,
  payload: {
    client,
    user
  }
});

export const setStatus = (status: any) => ({
  type: SET_STATUS,
  payload: {
    status
  }
});

export const setMessage = (message: SnackbarMessage | null = null) => ({
  type: SET_MESSAGE,
  payload: {
    message
  }
});

export const setGamesData = (
  games: ResponseTable = {
    more: false,
    next_key: '',
    rows: []
  }
) => ({
  type: SET_GAMES,
  payload: {
    games: games
  }
});

export const setCallsData = (
  calls: ResponseTable = {
    more: false,
    next_key: '',
    rows: []
  }
) => ({
  type: SET_CALLS,
  payload: {
    calls
  }
});

export const setNewData = (
  games: ResponseTable = {
    more: false,
    next_key: '',
    rows: []
  },
  calls: ResponseTable = {
    more: false,
    next_key: '',
    rows: []
  }
) => ({
  type: SET_NEWDATA,
  payload: {
    games,
    calls
  }
});

export const setRefresh = (refresh: String) => ({
  type: SET_REFRESH,
  payload: {
    refresh
  }
});

export const setTop = (top: []) => ({
  type: SET_TOP,
  payload: {
    top
  }
});