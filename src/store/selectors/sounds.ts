import { IRootState } from "store/reducers/root";
import { ISound } from "types";

export const getSound = (state: IRootState, id: string): ISound => {
    return state.sounds[id];
};
