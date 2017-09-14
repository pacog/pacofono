import { applyMiddleware, compose, createStore  } from "redux";
import { IRootState, rootReducer } from "./reducers/root";

function configureStore() {
  // create store
  return createStore<IRootState>(
    rootReducer,
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
