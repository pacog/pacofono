export const ADD_SONG = "ADD_SONG";
export const EDIT_SONG = "EDIT_SONG";
export const DELETE_SONG = "DELETE_SONG";

export interface IActions {
  ADD_SONG: {
    type: typeof ADD_SONG,
  };
  EDIT_SONG: {
    type: typeof EDIT_SONG,
  };
  DELETE_SONG: {
    type: typeof DELETE_SONG,
  };
}

export const actionCreatorss = {
  addSong: (): IActions[typeof ADD_SONG] => ({
    type: ADD_SONG,
  }),
  deleteSong: (): IActions[typeof DELETE_SONG] => ({
    type: DELETE_SONG,
  }),
  editSong: (): IActions[typeof EDIT_SONG] => ({
    type: EDIT_SONG,
  }),
};
