import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { ISong } from "types";
import { getSong, getOriginalSong, isNewSong, isEditingSong } from "store/selectors/songEditor";
import { actionCreators as songsActions } from "store/actions/songs";

export const START_EDITING_NEW_SONG = "START_EDITING_NEW_SONG";
export const STOP_EDITING = "STOP_EDITING";
export const START_EDITING_EXISTING_SONG = "START_EDITING_EXISTING_SONG";

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
