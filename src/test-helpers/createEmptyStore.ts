import { applyMiddleware, createStore  } from "redux";
import thunk from "redux-thunk";

import { IRootState, rootReducer } from "store/reducers/root";
import { RootAction } from "store/actions";

export default function() {
  return createStore<IRootState, RootAction, {}, {}>(
    rootReducer,
    {},
    applyMiddleware(thunk),
  );
}
