import { IRootState } from "store/reducers/root";
import { IChord } from "types";

export const getChordById = (state: IRootState, id: string): IChord => {
    return state.chords[id];
};
