import { combineReducers } from "redux";

import { ISongsState, songsReducer } from "./songs";

export interface IRootState {
  readonly songs: ISongsState;
}

export const rootReducer = combineReducers<IRootState>({
  songs: songsReducer,
});
