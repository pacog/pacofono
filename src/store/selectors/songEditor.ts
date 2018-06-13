import { IRootState } from "store/reducers/root";
import { ISong, ISongPart } from "types";
import { getSong as getSongFromSongStore } from "store/selectors/songs";
import { getPartById } from "store/selectors/parts";

export const getSong = (state: IRootState): ISong => {
    if (!state.songEditor.songId) {
        return null;
    }
    return getSongFromSongStore(state, state.songEditor.songId);
};

export const getOriginalSong = (state: IRootState): ISong => {
    if (!state.songEditor.originalSongId) {
        return null;
    }
    return getSongFromSongStore(state, state.songEditor.originalSongId);
};

export const isNewSong = (state: IRootState): boolean => {
    return state.songEditor.isNewSong;
};

export const isEditingSong = (state: IRootState): boolean => {
    return !isNewSong(state);
};

export const isShowingConfirmRestoreDefaults = (state: IRootState): boolean => {
    return state.songEditor.isShowingConfirmRestoreDefaults;
};

export const isShowingConfirmDeleteSong = (state: IRootState): boolean => {
    return state.songEditor.isShowingConfirmDeleteSong;
};

export const getPartBeingEdited = (state: IRootState): ISongPart => {
    if (!state.songEditor.songId || !state.songEditor.selectedPartId) {
        return null;
    }
    return getPartById(state, state.songEditor.selectedPartId);
};

export const isPartBeingEdited = (state: IRootState, part: ISongPart): boolean => {
    if (!part) {
        throw new Error("isPartBeingEdited: no part received");
    }
    const partBeingEdited = getPartBeingEdited(state);
    return partBeingEdited.id === part.id;
};
