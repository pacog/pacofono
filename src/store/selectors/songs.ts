import { IRootState } from "store/reducers/root";
import { ISong } from "types";

export const getSongNames = (state: IRootState): string[] => {
    // TODO
    return null;
};

export const getSong = (state: IRootState, id: string): ISong => {
    return state.songs[id];
};
