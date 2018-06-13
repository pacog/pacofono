import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { RootAction } from "store/actions";
import { ISong } from "types";
import { getSong, getOriginalSong, isEditingSong } from "store/selectors/songEditor";
import { getSavedSongs } from "store/selectors/songs";
import { duplicateSong, cascadeDeleteSong } from "store/actions/songs";
import { actionCreators as currentSongActions } from "store/actions/currentSong";

export const START_EDITING_NEW_SONG = "START_EDITING_NEW_SONG";
export const STOP_EDITING = "STOP_EDITING";
export const START_EDITING_EXISTING_SONG = "START_EDITING_EXISTING_SONG";
export const SHOW_CONFIRM_RESTORE_DEFAULTS = "SHOW_CONFIRM_RESTORE_DEFAULTS";
export const SHOW_CONFIRM_DELETE_SONG = "SHOW_CONFIRM_DELETE_SONG";
export const SELECT_SONG_PART_TO_EDIT = "SELECT_SONG_PART_TO_EDIT";

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
    SELECT_SONG_PART_TO_EDIT: {
        type: typeof SELECT_SONG_PART_TO_EDIT,
        partId: string,
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
    selectSongPartToEdit: (partId: string): ISongEditorActions[typeof SELECT_SONG_PART_TO_EDIT] => ({
        type: SELECT_SONG_PART_TO_EDIT,
        partId,
    }),
};

export const saveSongBeingEdited = (): ThunkAction<ISong, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): ISong => {
        const song = getSong(getState());
        if (isEditingSong(getState())) {
            const oldSong = getOriginalSong(getState());
            dispatch(cascadeDeleteSong(oldSong) as any);
        }
        dispatch(actionCreators.stopEditing());
        return song;
    };
};

export const restoreDefaults = (): ThunkAction<void, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): void => {
        if (isEditingSong(getState())) {
            const song = getSong(getState());
            dispatch(cascadeDeleteSong(song) as any);
            const originalSong = getOriginalSong(getState());
            dispatch(duplicateSong(originalSong) as any)
                .then((duplicatedSong: ISong) => {
                    dispatch(actionCreators.startEditingExistingSong(duplicatedSong, originalSong));
                });
        }
    };
};

export const deleteSongBeingEdited = (): ThunkAction<void, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): void => {
        if (isEditingSong(getState())) {
            const song = getSong(getState());
            dispatch(cascadeDeleteSong(song) as any);
            const originalSong = getOriginalSong(getState());
            dispatch(cascadeDeleteSong(originalSong) as any);
            const allSongs = getSavedSongs(getState());
            if (allSongs.length) {
                dispatch(currentSongActions.setCurrentSong(allSongs[0]));
            } else {
                dispatch(currentSongActions.setCurrentSong(null));
            }
        }
    };
};
