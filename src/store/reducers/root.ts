import { combineReducers } from "redux";

import { IMusicModeState, musicModeReducer } from "./musicMode";
import { ISongsState, songsReducer } from "./songs";
import { IModalsState, modalsReducer } from "./modals";

export interface IRootState {
    readonly songs?: ISongsState;
    readonly musicMode?: IMusicModeState;
    readonly modals?: IModalsState;
}

export const rootReducer = combineReducers<IRootState>({
    musicMode: musicModeReducer,
    songs: songsReducer,
    modals: modalsReducer,
});
