import { Promise } from "es6-promise";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { RootAction } from "store/actions";
import { ISong, ISongPart, IChord } from "types";
import {
    getSong,
    getOriginalSong,
    isEditingSong,
    getPartBeingEdited,
    getChordsFromPartBeingEdited,
} from "store/selectors/songEditor";
import { getPartById } from "store/selectors/parts";
import { getSavedSongs, getSong as getSongFromStore } from "store/selectors/songs";
import { duplicateSong, cascadeDeleteSong } from "store/actions/songs";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { getDefaultNewSong } from "constants/defaultNewSong";
import { getDefaultNewSongPart } from "constants/defaultNewSongPart";
import { getDefaultNewChord } from "constants/defaultNewChord";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songsActions } from "store/actions/songs";
import { actionCreators as partsActions, cascadeDeletePart } from "store/actions/parts";
import { actionCreators as chordsActions } from "store/actions/chords";

export const START_EDITING_NEW_SONG = "START_EDITING_NEW_SONG";
export const STOP_EDITING = "STOP_EDITING";
export const START_EDITING_EXISTING_SONG = "START_EDITING_EXISTING_SONG";
export const SHOW_CONFIRM_RESTORE_DEFAULTS = "SHOW_CONFIRM_RESTORE_DEFAULTS";
export const SHOW_CONFIRM_DELETE_SONG = "SHOW_CONFIRM_DELETE_SONG";
export const SELECT_SONG_PART_TO_EDIT = "SELECT_SONG_PART_TO_EDIT";
export const SHOW_CONFIRM_DELETE_PART = "SHOW_CONFIRM_DELETE_PART";
export const SELECT_CHORD_TO_EDIT = "SELECT_CHORD_TO_EDIT";

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
    SHOW_CONFIRM_DELETE_PART: {
        type: typeof SHOW_CONFIRM_DELETE_PART,
        shouldShow: boolean,
    };
    SELECT_CHORD_TO_EDIT: {
        type: typeof SELECT_CHORD_TO_EDIT,
        chordId: string,
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
    showConfirmDeletePart: (shouldShow: boolean): ISongEditorActions[typeof SHOW_CONFIRM_DELETE_PART] => ({
        type: SHOW_CONFIRM_DELETE_PART,
        shouldShow,
    }),
    selectChordToEdit: (chordId: string): ISongEditorActions[typeof SELECT_CHORD_TO_EDIT] => ({
        type: SELECT_CHORD_TO_EDIT,
        chordId,
    }),
};

export const saveSongBeingEdited = (): ThunkAction<Promise<ISong>, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): Promise<ISong> => {
        const song = getSong(getState());
        if (isEditingSong(getState())) {
            const oldSong = getOriginalSong(getState());
            return dispatch(cascadeDeleteSong(oldSong) as any).then(() => {
                dispatch(actionCreators.stopEditing());
                return song;
            });
        }
        dispatch(actionCreators.stopEditing());
        return new Promise((resolve) => {
            resolve(song);
        });
    };
};

// TODO add Promise
export const restoreDefaults = (): ThunkAction<void, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): void => {
        if (isEditingSong(getState())) {
            let originalSong: ISong;
            const song = getSong(getState());
            return dispatch(cascadeDeleteSong(song) as any)
                .then(() => {
                    originalSong = getOriginalSong(getState());
                    return dispatch(duplicateSong(originalSong) as any);
                })
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
            return dispatch(cascadeDeleteSong(song) as any)
                .then(() => {
                    const originalSong = getOriginalSong(getState());
                    return dispatch(cascadeDeleteSong(originalSong) as any);
                })
                .then(() => {
                    const allSongs = getSavedSongs(getState());
                    const songToSetAsCurrent = allSongs.length ? allSongs[0] : null;
                    dispatch(currentSongActions.setCurrentSong(songToSetAsCurrent));
                });
        }
    };
};

export const openForNewSong = (): ThunkAction<ISong, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): ISong => {
        dispatch(modalsActions.openSongEditor());
        const newSong = getDefaultNewSong();
        dispatch(songsActions.addSong(newSong));
        const newPart = getDefaultNewSongPart();
        dispatch(partsActions.addPart(newPart, newSong.id));
        const newChord = getDefaultNewChord();
        dispatch(chordsActions.addChord(newChord, newPart.id));
        const fullSong = getSongFromStore(getState(), newSong.id);
        dispatch(actionCreators.startEditingNewSong(fullSong));
        dispatch(actionCreators.selectSongPartToEdit(newPart.id));
        dispatch(actionCreators.selectChordToEdit(newChord.id));
        return fullSong;
    };
};

export const openForExistingSong = (song: ISong): ThunkAction<Promise<ISong>, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): Promise<ISong> => {
        return dispatch(duplicateSong(song) as any)
            .then((duplicatedSong: ISong) => {
                dispatch(modalsActions.openSongEditor());
                dispatch(actionCreators.startEditingExistingSong(duplicatedSong, song));
                dispatch(actionCreators.selectSongPartToEdit(duplicatedSong.parts[0]));
                const chordsInEditedPart = getChordsFromPartBeingEdited(getState());
                if (chordsInEditedPart[0]) {
                    dispatch(actionCreators.selectChordToEdit(chordsInEditedPart[0].id));
                } else {
                    dispatch(actionCreators.selectChordToEdit(null));
                }
                return duplicatedSong;
            });
    };
};

// TODO: test
export const deletePartAndSelectOther =
(part: ISongPart, song: ISong): ThunkAction<void, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): void => {
        return dispatch(cascadeDeletePart(part, song.id) as any)
            .then(() => {
                const songWithoutPart = getSongFromStore(getState(), song.id);
                return dispatch(actionCreators.selectSongPartToEdit(songWithoutPart.parts[0]));
            });
    };
};

// TODO: test
export const deleteChordAndSelectOther =
(chord: IChord, partId: string): ThunkAction<void, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): void => {
        dispatch(chordsActions.deleteChord(chord, partId));
        const partWithoutChord = getPartById(getState(), partId);
        dispatch(actionCreators.selectChordToEdit(partWithoutChord.chords[0]));
    };
};

export const addChordToPartBeingEdited = (): ThunkAction<IChord, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): IChord => {
        const part = getPartBeingEdited(getState());
        const newChord = getDefaultNewChord();
        dispatch(chordsActions.addChord(newChord, part.id));
        return newChord;
    };
};
