import { combineReducers } from "redux";

import { IMusicModeState, musicModeReducer } from "./musicMode";
import { ISongsState, songsReducer } from "./songs";
import { IPartsState, partsReducer } from "./parts";
import { IModalsState, modalsReducer } from "./modals";
import { ISongEditorState, songEditorReducer } from "./songEditor";
import { ICurrentSongsState, currentSongReducer } from "./currentSong";
import { ISongSelectorState, songSelectorReducer } from "./songSelector";

export interface IRootState {
    readonly songs?: ISongsState;
    readonly parts?: IPartsState;
    readonly musicMode?: IMusicModeState;
    readonly modals?: IModalsState;
    readonly songEditor?: ISongEditorState;
    readonly currentSong?: ICurrentSongsState;
    readonly songSelector?: ISongSelectorState;
}

export const rootReducer = combineReducers<IRootState>({
    musicMode: musicModeReducer,
    songs: songsReducer,
    parts: partsReducer,
    modals: modalsReducer,
    songEditor: songEditorReducer,
    currentSong: currentSongReducer,
    songSelector: songSelectorReducer,
});
