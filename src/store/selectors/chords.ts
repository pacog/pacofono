import { IRootState } from "store/reducers/root";
import { ISongPart, IChord } from "types";


export const getChordById = (state: IRootState, id: string): IChord => {
    return state.chords[id];
};

// TODO: test
export const getPartChords = (state: IRootState, part: ISongPart): IChord[] => {
    return part.chords.map((chordId) => getChordById(state, chordId));
};
