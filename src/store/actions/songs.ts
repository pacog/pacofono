import { ISong } from "types";

export const ADD_SONG = "ADD_SONG";
export const EDIT_SONG = "EDIT_SONG";
export const DELETE_SONG = "DELETE_SONG";

export interface ISongsActions {
    ADD_SONG: {
        type: typeof ADD_SONG,
        song: ISong,
    };
    EDIT_SONG: {
        type: typeof EDIT_SONG,
        song: ISong,
    };
    DELETE_SONG: {
        type: typeof DELETE_SONG,
        song: ISong,
    };
}

export const actionCreators = {
    addSong: (song: ISong): ISongsActions[typeof ADD_SONG] => ({
        type: ADD_SONG,
        song,
    }),
    deleteSong: (song: ISong): ISongsActions[typeof DELETE_SONG] => ({
        type: DELETE_SONG,
        song,
    }),
    editSong: (song: ISong): ISongsActions[typeof EDIT_SONG] => ({
        type: EDIT_SONG,
        song,
    }),
};
