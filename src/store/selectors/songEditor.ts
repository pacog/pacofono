import { IRootState } from "store/reducers/root";
import { ISong } from "types";
import { getSong as getSongFromSongStore } from "store/selectors/songs";

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
