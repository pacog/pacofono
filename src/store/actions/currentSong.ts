import { ISong } from "types";

export const SET_CURRENT_SONG = "SET_CURRENT_SONG";

export interface ICurrentSongsActions {
    SET_CURRENT_SONG: {
        type: typeof SET_CURRENT_SONG,
        song: ISong,
    };
}

export const actionCreators = {
    setCurrentSong: (song: ISong): ICurrentSongsActions[typeof SET_CURRENT_SONG] => ({
        type: SET_CURRENT_SONG,
        song,
    }),
};
