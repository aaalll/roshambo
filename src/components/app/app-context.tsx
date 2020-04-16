import React, { useReducer, useEffect } from 'react';

import rootReducer, { StoreContext, initialState } from 'store/reducers/reducer';
import storeMiddleware from 'services/store';
import { loadWallet } from 'store/sagas/sagas';

const AppContext = (props: { children: React.ReactNode; }) => {
  const [state, dispatch] = useReducer(storeMiddleware(rootReducer), initialState);

  useEffect(() => {
    if (!state.client && state.status !== 'loading') {
      loadWallet({dispatch, state})()
    }
  }, [state]);  

  return (
    <StoreContext.Provider value={{state: state, dispatch: dispatch}}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default AppContext;