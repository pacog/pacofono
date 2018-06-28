import { IRootState } from "store/reducers/root";
import { ISong, ISongPart, IChord } from "types";
import { getSong as getSongFromSongStore } from "store/selectors/songs";
import { getPartById } from "store/selectors/parts";
import { getPartChords, getChordById } from "store/selectors/chords";

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

export const getChordsFromPartBeingEdited = (state: IRootState): IChord[] => {
    const part = getPartBeingEdited(state);
    if (!part) {
        return null;
    }
    return getPartChords(state, part);
};

export const getChordBeingEdited = (state: IRootState): IChord => {
    if (!state.songEditor.selectedChordId) {
        return null;
    }
    return getChordById(state, state.songEditor.selectedChordId);
};

export const isPartBeingEdited = (state: IRootState, part: ISongPart): boolean => {
    if (!part) {
        throw new Error("isPartBeingEdited: no part received");
    }
    const partBeingEdited = getPartBeingEdited(state);
    return partBeingEdited.id === part.id;
};

export const canPartBeDeleted = (state: IRootState, part: ISongPart): boolean => {
    const song = getSong(state);
    if (!part || !song || !song.parts) {
        return false;
    }
    const isPartInSong = song.parts.indexOf(part.id) !== -1;
    if (!isPartInSong) {
        return false;
    }
    return song.parts.length && song.parts.length > 1;
};

export const isShowingConfirmDeletePart = (state: IRootState): boolean => {
    return state.songEditor.isShowingConfirmDeletePart;
};

export const canSelectedChordBeDeleted = (state: IRootState): boolean => {
    const chords = getChordsFromPartBeingEdited(state);
    return chords && chords.length > 1;
};
