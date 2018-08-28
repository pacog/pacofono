import { combineReducers } from "redux";

import { IMusicModeState, musicModeReducer } from "./musicMode";
import { ISongsState, songsReducer } from "./songs";
import { IPartsState, partsReducer } from "./parts";
import { IChordsState, chordsReducer } from "./chords";
import { IModalsState, modalsReducer } from "./modals";
import { ISongEditorState, songEditorReducer } from "./songEditor";
import { ICurrentSongState, currentSongReducer } from "./currentSong";
import { ICurrentSongPartState, currentSongPartReducer } from "./currentSongPart";
import { ISongSelectorState, songSelectorReducer } from "./songSelector";
import { IMainVolumeState, mainVolumeReducer } from "./mainVolume";
import { IMainOptionsState, mainOptionsReducer } from "./mainOptions";

export interface IRootState {
    readonly songs?: ISongsState;
    readonly parts?: IPartsState;
    readonly chords?: IChordsState;
    readonly musicMode?: IMusicModeState;
    readonly modals?: IModalsState;
    readonly songEditor?: ISongEditorState;
    readonly currentSong?: ICurrentSongState;
    readonly currentSongPart?: ICurrentSongPartState;
    readonly songSelector?: ISongSelectorState;
    readonly mainVolume?: IMainVolumeState;
    readonly mainOptions?: IMainOptionsState;
}

export const rootReducer = combineReducers<IRootState>({
    musicMode: musicModeReducer,
    songs: songsReducer,
    parts: partsReducer,
    chords: chordsReducer,
    modals: modalsReducer,
    songEditor: songEditorReducer,
    currentSong: currentSongReducer,
    currentSongPart: currentSongPartReducer,
    songSelector: songSelectorReducer,
    mainVolume: mainVolumeReducer,
    mainOptions: mainOptionsReducer,
});
