import { RootAction } from "store/actions";
import { ADD_SONG } from "store/actions/songs";

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
        default:
            return state;
    }
};
