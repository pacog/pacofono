import { combineReducers } from "redux";

import { RootAction } from "store/actions";
import { START_EDITING_NEW_SONG,
    STOP_EDITING,
    START_EDITING_EXISTING_SONG,
    SHOW_CONFIRM_RESTORE_DEFAULTS,
    SHOW_CONFIRM_DELETE_SONG,
    SELECT_SONG_PART_TO_EDIT,
    SELECT_CHORD_TO_EDIT,
    SHOW_CONFIRM_DELETE_PART,
} from "store/actions/songEditor";

export interface ISongEditorState {
    readonly isNewSong: boolean;
    readonly songId: string;
    readonly originalSongId: string;
    readonly isShowingConfirmRestoreDefaults: boolean;
    readonly isShowingConfirmDeleteSong: boolean;
    readonly selectedPartId: string;
    readonly selectedChordId: string;
    readonly isShowingConfirmDeletePart: boolean;
}

export const songEditorReducer = combineReducers<ISongEditorState>({
    isNewSong,
    songId,
    originalSongId,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
    selectedPartId,
    selectedChordId,
    isShowingConfirmDeletePart,
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

function selectedPartId(state: string = null, action: RootAction) {
    switch (action.type) {
        case STOP_EDITING:
            return null;
        case SELECT_SONG_PART_TO_EDIT:
            return action.partId;
        default:
            return state;
    }
}

function selectedChordId(state: string = null, action: RootAction) {
    switch (action.type) {
        case STOP_EDITING:
            return null;
        case SELECT_CHORD_TO_EDIT:
            return action.chordId;
        default:
            return state;
    }
}

function isShowingConfirmDeletePart(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SHOW_CONFIRM_DELETE_PART:
            return action.shouldShow;
        case STOP_EDITING:
        case START_EDITING_NEW_SONG:
        case START_EDITING_EXISTING_SONG:
        case SELECT_SONG_PART_TO_EDIT:
        case SHOW_CONFIRM_DELETE_SONG:
        case SHOW_CONFIRM_RESTORE_DEFAULTS:
            return false;
        default:
            return state;
    }
}
