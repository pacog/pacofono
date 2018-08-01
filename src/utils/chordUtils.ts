import { IChord } from "types";

export const getMaxNotesInChords = (chords: IChord[]): number => {
    if (!chords) {
        return 0;
    }
    return chords.reduce((accumulator: number, currentValue: IChord): number => {
        return Math.max(accumulator, currentValue.notes.length);
    }, 0);
};
