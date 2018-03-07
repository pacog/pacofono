import { applyMiddleware, compose, createStore  } from "redux";
import { IRootState, rootReducer } from "./reducers/root";

function configureStore() {
  // create store
  return createStore<IRootState>(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
