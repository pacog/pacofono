import { IRootState } from "store/reducers/root";
import { ISong } from "types";

export const getSong: ((state: IRootState) => ISong) = (state: IRootState) => {
    return state.songEditor.song;
};

export const getOriginalSong: ((state: IRootState) => ISong) = (state: IRootState) => {
    return state.songEditor.originalSong;
};

export const isNewSong: ((state: IRootState) => boolean) = (state: IRootState) => {
    return state.songEditor.isNewSong;
};

export const isEditingSong: ((state: IRootState) => boolean) = (state: IRootState) => {
    return !isNewSong(state);
};
