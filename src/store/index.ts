import { applyMiddleware, createStore  } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { throttle } from "lodash";
import { IRootState, rootReducer } from "./reducers/root";
import { RootAction } from "store/actions";
import { loadState, saveState } from "./localStorage";

function configureStore() {
  const persistedState = loadState();
  return createStore<IRootState, RootAction, {}, {}>(
    rootReducer,
    persistedState,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
  );
}

const THROTTLE_TIME = 1000;
const store = configureStore();
const saveStateThrottled = throttle(() => {
    saveState(store.getState()); // TODO we can decide if we want the whole state
}, THROTTLE_TIME);

store.subscribe(saveStateThrottled);
// export store singleton instance
export default store;
