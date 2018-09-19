import { combineReducers } from "redux";

import { IMusicModeState, musicModeReducer } from "./musicMode";
import { ISoundsState, soundsReducer } from "./sounds";
import { ISongsState, songsReducer } from "./songs";
import { IPartsState, partsReducer } from "./parts";
import { IChordsState, chordsReducer } from "./chords";
import { IModalsState, modalsReducer } from "./modals";
import { ISongEditorState, songEditorReducer } from "./songEditor";
import { ICurrentSoundState, currentSoundReducer } from "./currentSound";
import { ICurrentSongState, currentSongReducer } from "./currentSong";
import { ICurrentSongPartState, currentSongPartReducer } from "./currentSongPart";
import { ISongSelectorState, songSelectorReducer } from "./songSelector";
import { IMainVolumeState, mainVolumeReducer } from "./mainVolume";
import { IMainOptionsState, mainOptionsReducer } from "./mainOptions";

export interface IRootState {
    readonly sounds?: ISoundsState;
    readonly songs?: ISongsState;
    readonly parts?: IPartsState;
    readonly chords?: IChordsState;
    readonly musicMode?: IMusicModeState;
    readonly modals?: IModalsState;
    readonly songEditor?: ISongEditorState;
    readonly currentSound?: ICurrentSoundState;
    readonly currentSong?: ICurrentSongState;
    readonly currentSongPart?: ICurrentSongPartState;
    readonly songSelector?: ISongSelectorState;
    readonly mainVolume?: IMainVolumeState;
    readonly mainOptions?: IMainOptionsState;
}

export const rootReducer = combineReducers<IRootState>({
    musicMode: musicModeReducer,
    sounds: soundsReducer,
    songs: songsReducer,
    parts: partsReducer,
    chords: chordsReducer,
    modals: modalsReducer,
    songEditor: songEditorReducer,
    currentSound: currentSoundReducer,
    currentSong: currentSongReducer,
    currentSongPart: currentSongPartReducer,
    songSelector: songSelectorReducer,
    mainVolume: mainVolumeReducer,
    mainOptions: mainOptionsReducer,
});
