import { RootAction } from '../actions';

export type SongsState = {
  readonly songs: string[],
};

const initialState: SongsState = {
  songs: ['flacido', 'stairway']
};

export const songsReducer = (state: SongsState = initialState, action : RootAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
