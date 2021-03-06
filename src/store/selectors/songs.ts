import { IRootState } from "store/reducers/root";
import { ISong } from "types";

export const getSavedSongs = (state: IRootState): ISong[] => {
    return Object
        .keys(state.songs)
        .filter((key) => key !== state.songEditor.songId) // Do not return song being edited
        .map((key) => state.songs[key])
        .filter((song) => !!song); // Remove empty songs (deleted ones are marked as undefined)
};

export const getSong = (state: IRootState, id: string): ISong => {
    return state.songs[id];
};
