import { combineReducers } from "redux";

import { RootAction } from "store/actions";
import { START_EDITING_NEW_SONG } from "store/actions/songEditor";
import { ISong } from "types";

export interface ISongEditorState {
    readonly isNewSong: boolean;
    readonly song: ISong;
    readonly originalSong: ISong;
}

const initialState: ISongEditorState = {
    isNewSong: false,
    song: null,
    originalSong: null,
};

export const songEditorReducer = combineReducers<ISongEditorState>({
    isNewSong,
    song,
    originalSong,
});


function isNewSong(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case START_EDITING_NEW_SONG:
            return true;
        default:
            return state;
    }
}

function song(state: ISong = null, action: RootAction) {
    switch (action.type) {
        case START_EDITING_NEW_SONG:
            return { ...action.song }; // TODO: at some point make deep copy
        default:
            return state;
    }
}

function originalSong(state: ISong = null, action: RootAction) {
    switch (action.type) {
        case START_EDITING_NEW_SONG:
            return { ...action.song }; // TODO: at some point make deep copy
        default:
            return state;
    }
}
