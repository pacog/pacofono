import { ISong } from "types";

export const ADD_SONG = "ADD_SONG";
export const DELETE_SONG = "DELETE_SONG";
export const CHANGE_SONG_NAME = "CHANGE_SONG_NAME";

export interface ISongsActions {
    ADD_SONG: {
        type: typeof ADD_SONG,
        song: ISong,
    };
    DELETE_SONG: {
        type: typeof DELETE_SONG,
        song: ISong,
    };
    CHANGE_SONG_NAME: {
        type: typeof CHANGE_SONG_NAME,
        song: ISong,
        newName: string,
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
    changeSongName: (song: ISong, newName: string): ISongsActions[typeof CHANGE_SONG_NAME] => ({
        type: CHANGE_SONG_NAME,
        song,
        newName,
    }),
};
