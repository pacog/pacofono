import { IRootState } from "store/reducers/root";

export const getSongNames = (state: IRootState) => {
    return state.songs.songs;
};
