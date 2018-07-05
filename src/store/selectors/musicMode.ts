import { IRootState } from "store/reducers/root";

export const getMusicMode = (state: IRootState): string => {
    return state.musicMode.mode;
};
