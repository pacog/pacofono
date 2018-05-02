import { combineReducers } from "redux";

import { IMusicModeState, musicModeReducer } from "./musicMode";
import { ISongsState, songsReducer } from "./songs";
import { IModalsState, modalsReducer } from "./modals";
import { ISongEditorState, songEditorReducer } from "./songEditor";
import { ICurrentSongsState, currentSongReducer } from "./currentSong";
import { ISongSelectorState, songSelectorReducer } from "./songSelector";

export interface IRootState {
    readonly songs?: ISongsState;
    readonly musicMode?: IMusicModeState;
    readonly modals?: IModalsState;
    readonly songEditor?: ISongEditorState;
    readonly currentSong?: ICurrentSongsState;
    readonly songSelector?: ISongSelectorState;
}

export const rootReducer = combineReducers<IRootState>({
    musicMode: musicModeReducer,
    songs: songsReducer,
    modals: modalsReducer,
    songEditor: songEditorReducer,
    currentSong: currentSongReducer,
    songSelector: songSelectorReducer,
});
