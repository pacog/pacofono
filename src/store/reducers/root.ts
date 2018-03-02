import { combineReducers } from "redux";

import { IMusicModeState, musicModeReducer } from "./musicMode";
import { ISongsState, songsReducer } from "./songs";

export interface IRootState {
    readonly songs: ISongsState;
    readonly musicMode: IMusicModeState;
}

export const rootReducer = combineReducers<IRootState>({
    musicMode: musicModeReducer,
    songs: songsReducer,
});
