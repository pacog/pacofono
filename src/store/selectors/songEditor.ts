import { IRootState } from "store/reducers/root";

export const getSong = (state: IRootState) => {
    return state.songEditor.song;
};

export const getOriginalSong = (state: IRootState) => {
    return state.songEditor.song;
};

export const isNewSong = (state: IRootState) => {
    return state.songEditor.isNewSong;
};

export const isEditingSong = (state: IRootState) => {
    return !isNewSong(state);
};
