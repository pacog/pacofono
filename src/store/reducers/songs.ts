import { RootAction } from "store/actions";

export interface ISongsState {
  readonly songs: string[];
}

const initialState: ISongsState = {
  songs: ["flacido", "stairway"],
};

export const songsReducer = (state: ISongsState = initialState, action: RootAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
