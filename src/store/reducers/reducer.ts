import React from 'react';
import { User } from 'models/user/user.model';
import { ResponseTable } from 'models/response-table/response-table.model';
import { environment } from '../../env/';

import {
  SET_WALLET,
  SET_STATUS,
  SET_MESSAGE,
  SET_GAMES,
  SET_CALLS,

  SET_AUTHDATA,
  LOGOUT,
  SET_ACCOUNT,
  SET_MODAL,
  SET_ACCOUNT_KEY
} from 'store/actions/actions';

export interface StoreState {
  modalType: string;
  user: User | null;
  environment: any;
  accessToken: string;
  client: any;
  message: any;
  status: string;
  games: ResponseTable;
  calls: ResponseTable;
}

export interface StoreProps {
  state: StoreState;
  dispatch: ({ type }: { type: string }) => void;
}

export const initialState: StoreState = {
  modalType: '',
  user: null,
  environment,
  accessToken: '',
  client: null,
  message: null,
  status: '',
  games: {
    more: false,
    next_key: '',
    rows: []
  },
  calls: {
    more: false,
    next_key: '',
    rows: []
  }
};

export default function rootReducer(state: StoreState, action: any) {
  console.log('action.payload.games', action.type,  action.payload);
  
  switch (action.type) {
    case SET_WALLET:
      return {
        ...state,
        user: action.payload.user,
        client: action.payload.client
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload.status
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      };
    case SET_GAMES:
      return {
        ...state,
        games: action.payload.games
      };
    case SET_CALLS:
      return {
        ...state,
        calls: action.payload.calls
      };

    case SET_AUTHDATA:
      return {
        ...state,
        user: action.payload.user,
        account: action.payload.account,
        accessToken: action.payload.accessToken
      };
    case LOGOUT:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.JWT
      };
    case SET_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType
      };
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload.account
      };
    case SET_ACCOUNT_KEY:
      return {
        ...state,
        key: action.payload.key
      };
  }

  return state;
}

export const StoreContext = React.createContext({} as StoreProps);
