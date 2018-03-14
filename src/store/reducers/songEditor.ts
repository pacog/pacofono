import { combineReducers } from "redux";

import { RootAction } from "store/actions";
import { START_EDITING_NEW_SONG, STOP_EDITING } from "store/actions/songEditor";
import { ISong } from "types";

export interface ISongEditorState {
    readonly isNewSong: boolean;
    readonly songId: string;
    readonly originalSongId: string;
}

const initialState: ISongEditorState = {
    isNewSong: false,
    songId: null,
    originalSongId: null,
};

export const songEditorReducer = combineReducers<ISongEditorState>({
    isNewSong,
    songId,
    originalSongId,
});


function isNewSong(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case STOP_EDITING:
            return false;
        case START_EDITING_NEW_SONG:
            return true;
        default:
            return state;
    }
}

function songId(state: string = null, action: RootAction) {
    switch (action.type) {
        case STOP_EDITING:
            return null;
        case START_EDITING_NEW_SONG:
            return action.song.id;
        default:
            return state;
    }
}

function originalSongId(state: string = null, action: RootAction) {
    switch (action.type) {
        case STOP_EDITING:
            return null;
        case START_EDITING_NEW_SONG:
            return null;
        default:
            return state;
    }
}
