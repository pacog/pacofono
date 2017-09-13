import { combineReducers } from 'redux';

import { SongsState, songsReducer } from './songs';

export type RootState = {
  readonly songs: SongsState,
};

export const rootReducer = combineReducers<RootState>({
  songs: songsReducer
});
