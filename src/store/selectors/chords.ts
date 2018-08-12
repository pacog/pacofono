import { createSelector } from "reselect";
import { IRootState } from "store/reducers/root";
import { ISongPart, IChord } from "types";

export const getChordById = (state: IRootState, id: string): IChord => {
    return state.chords[id];
};

// export const getPartChords = (state: IRootState, part: ISongPart): IChord[] => {
//     return part.chords.map((chordId) => getChordById(state, chordId));
// };

const getAllChords = (state: IRootState, part: ISongPart) => {
    return state.chords;
};

const getPartChordIds = (state: IRootState, part: ISongPart): string[] => {
    return part.chords;
};

export const getPartChords = createSelector(
    [ getPartChordIds, getAllChords ],
    (chordIds, allChords): IChord[] => {
        return chordIds.map((chordId) => allChords[chordId]);
    });
