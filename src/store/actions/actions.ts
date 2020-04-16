import history from 'utils/history';

import { AuthData } from 'models/auth-data/auth-data.model';
import { User } from 'models/user/user.model';
import { ResponseTable } from 'models/response-table/response-table.model';
import SnackbarMessage from 'models/message/message.model';
import { CompanyAccount } from 'models/company-account/company-account.model';

export const SET_WALLET = '@auth/SET_WALLET';
export const SET_STATUS = '@global/SET_STATUS';
export const SET_MESSAGE = '@global/SET_MESSAGE';
export const SET_GAMES = '@games/SET_GAMES';
export const SET_CALLS = '@games/SET_CALLS';

export const SET_USER = '@auth/SET_USER';
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';

export const SET_AUTHDATA = '@auth/SET_AUTHDATA';
export const SIGNUP = '@auth/SIGNUP';
export const SET_ACCOUNT = '@auth/SET_ACCOUNT';
export const SET_ACCOUNT_KEY = '@auth/SET_ACCOUNT_KEY';
export const SET_SOURCE = '@source/SET_SOURCE';

export const SET_MODAL = '@global/SET_MODAL';

export const setAuthData = (data: AuthData) => {
  localStorage.setItem('authData', JSON.stringify(data));
  return {
    type: SET_AUTHDATA,
    payload: {
      user: data.user,
      account: data.account,
      accessToken: data.accessToken
    }
  };
};

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: {
    user
  }
});

export const setAccount = (account: CompanyAccount) => ({
  type: SET_ACCOUNT,
  payload: {
    account
  }
});

export const setAccountKey = (key: string) => ({
  type: SET_ACCOUNT_KEY,
  payload: {
    key
  }
});

export const setSource = (source: string) => ({
  type: SET_SOURCE,
  payload: {
    source
  }
});

export const signup = () => ({
  type: SIGNUP
});

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
