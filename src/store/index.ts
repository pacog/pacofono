import { applyMiddleware, createStore  } from "redux";
import thunk from "redux-thunk";

import { IRootState, rootReducer } from "./reducers/root";
import { RootAction } from "store/actions";

function configureStore() {
  // create store
  return createStore<IRootState, RootAction, {}, {}>(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
