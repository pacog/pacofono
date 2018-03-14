import { IRootState } from "store/reducers/root";
import { ISong } from "types";
import { getSong as getSongFromSongStore } from "store/selectors/songs";

export const getCurrentSong = (state: IRootState): ISong => {
    if (state.currentSong.id === null) {
        return null;
    }
    return getSongFromSongStore(state, state.currentSong.id);
};

export const isCurrentSong = (state: IRootState, song: ISong): boolean => {
    if (!song) {
        return false;
    }
    const currentSong = getCurrentSong(state);
    if (currentSong === null) {
        return false;
    }
    return currentSong.id === song.id;
};
