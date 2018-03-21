import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { ISong } from "types";
import { getSong, getOriginalSong, isNewSong, isEditingSong } from "store/selectors/songEditor";
import { actionCreators as songsActions, duplicateSong } from "store/actions/songs";

export const START_EDITING_NEW_SONG = "START_EDITING_NEW_SONG";
export const STOP_EDITING = "STOP_EDITING";
export const START_EDITING_EXISTING_SONG = "START_EDITING_EXISTING_SONG";
export const SHOW_CONFIRM_RESTORE_DEFAULTS = "SHOW_CONFIRM_RESTORE_DEFAULTS";
export const SHOW_CONFIRM_DELETE_SONG = "SHOW_CONFIRM_DELETE_SONG";

export interface ISongEditorActions {
    START_EDITING_NEW_SONG: {
        type: typeof START_EDITING_NEW_SONG,
        song: ISong,
    };
    STOP_EDITING: {
        type: typeof STOP_EDITING,
    };
    START_EDITING_EXISTING_SONG: {
        type: typeof START_EDITING_EXISTING_SONG,
        song: ISong,
        originalSong: ISong,
    };
    SHOW_CONFIRM_RESTORE_DEFAULTS: {
        type: typeof SHOW_CONFIRM_RESTORE_DEFAULTS,
        shouldShow: boolean,
    };
    SHOW_CONFIRM_DELETE_SONG: {
        type: typeof SHOW_CONFIRM_DELETE_SONG,
        shouldShow: boolean,
    };
}

export const actionCreators = {
    startEditingNewSong: (song: ISong): ISongEditorActions[typeof START_EDITING_NEW_SONG] => ({
        type: START_EDITING_NEW_SONG,
        song,
    }),
    stopEditing: (): ISongEditorActions[typeof STOP_EDITING] => ({
        type: STOP_EDITING,
    }),
    startEditingExistingSong: (song: ISong, originalSong: ISong):
    ISongEditorActions[typeof START_EDITING_EXISTING_SONG] => ({
        type: START_EDITING_EXISTING_SONG,
        song,
        originalSong,
    }),
    showConfirmRestoreDefaults: (shouldShow: boolean): ISongEditorActions[typeof SHOW_CONFIRM_RESTORE_DEFAULTS] => ({
        type: SHOW_CONFIRM_RESTORE_DEFAULTS,
        shouldShow,
    }),
    showConfirmDeleteSong: (shouldShow: boolean): ISongEditorActions[typeof SHOW_CONFIRM_DELETE_SONG] => ({
        type: SHOW_CONFIRM_DELETE_SONG,
        shouldShow,
    }),
};

export const saveSongBeingEdited = (): ThunkAction<ISong, IRootState, {}> => {
    return (dispatch: Dispatch<IRootState>, getState: () => IRootState): ISong => {
        const song = getSong(getState());
        if (isEditingSong(getState())) {
            const oldSong = getOriginalSong(getState());
            dispatch(songsActions.deleteSong(oldSong));
        }
        dispatch(actionCreators.stopEditing());
        return song;
    };
};

export const restoreDefaults = (): ThunkAction<void, IRootState, {}> => {
    return (dispatch: Dispatch<IRootState>, getState: () => IRootState): void => {
        if (isEditingSong(getState())) {
            const song = getSong(getState());
            dispatch(songsActions.deleteSong(song));
            const originalSong = getOriginalSong(getState());
            const duplicatedSong = dispatch(duplicateSong(originalSong));
            dispatch(actionCreators.startEditingExistingSong(duplicatedSong, originalSong));
        }
    };
};
