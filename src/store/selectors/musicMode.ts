import { IRootState } from "store/reducers/root";

export const getMusicMode = (state: IRootState) => {
    return state.musicMode.mode;
};
