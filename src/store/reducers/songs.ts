import { RootAction } from "store/actions";
import { ADD_SONG, CHANGE_SONG_NAME } from "store/actions/songs";

import { ISong } from "types";

export interface ISongsState {
    readonly [id: string]: ISong;
}

const initialState: ISongsState = {};

export const songsReducer = (state: ISongsState = initialState, action: RootAction) => {
    switch (action.type) {
        case ADD_SONG:
            return {
                ...state,
                [action.song.id]: {...action.song},
            };
        case CHANGE_SONG_NAME:
            return {
                ...state,
                [action.song.id]: {...action.song, name: action.newName },
            };
        default:
            return state;
    }
};
