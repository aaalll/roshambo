import { initialState } from 'store/reducers/reducer';

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect({});
if (devTools) devTools.init(initialState);

export default function storeMiddleware(reducer: Function) {
  return (state: any, action: any) => {
    const updatedState = reducer(state, action);
    if (devTools) devTools.send(action, updatedState);
    return updatedState;
  }
}
