import { combineReducers } from "redux";

import { RootAction } from "store/actions";
import { START_EDITING_NEW_SONG,
    STOP_EDITING,
    START_EDITING_EXISTING_SONG,
    SHOW_CONFIRM_RESTORE_DEFAULTS,
    SHOW_CONFIRM_DELETE_SONG,
} from "store/actions/songEditor";

export interface ISongEditorState {
    readonly isNewSong: boolean;
    readonly songId: string;
    readonly originalSongId: string;
    readonly isShowingConfirmRestoreDefaults: boolean;
    readonly isShowingConfirmDeleteSong: boolean;
}

export const songEditorReducer = combineReducers<ISongEditorState>({
    isNewSong,
    songId,
    originalSongId,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
});


function isNewSong(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case STOP_EDITING:
            return false;
        case START_EDITING_NEW_SONG:
            return true;
        case START_EDITING_EXISTING_SONG:
            return false;
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
        case START_EDITING_EXISTING_SONG:
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
        case START_EDITING_EXISTING_SONG:
            return action.originalSong.id;
        default:
            return state;
    }
}

function isShowingConfirmRestoreDefaults(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SHOW_CONFIRM_RESTORE_DEFAULTS:
            return action.shouldShow;
        default:
            return state;
    }
}

function isShowingConfirmDeleteSong(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SHOW_CONFIRM_DELETE_SONG:
            return action.shouldShow;
        default:
            return state;
    }
}
