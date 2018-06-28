import { RootAction } from "store/actions";
import { ADD_PART, CHANGE_PART_NAME, DELETE_PART, CHANGE_CHORD_INDEX } from "store/actions/parts";
import { ADD_CHORD, DELETE_CHORD } from "store/actions/chords";

import { ISongPart } from "types";

export interface IPartsState {
    readonly [id: string]: ISongPart;
}

const initialState: IPartsState = {};

export const partsReducer = (state: IPartsState = initialState, action: RootAction) => {
    switch (action.type) {
        case ADD_PART:
            return {
                ...state,
                [action.part.id]: {...action.part},
            };
        case ADD_CHORD:
            const part = state[action.partId];
            if (!part) {
                return state;
            }
            const chordsWithNewChord = part.chords.concat(action.chord.id);
            return {
                ...state,
                [part.id]: {...part, chords: chordsWithNewChord},
            };
        case CHANGE_PART_NAME:
            return {
                ...state,
                [action.part.id]: {...action.part, name: action.newName },
            };
        case DELETE_PART:
            return {
                ...state,
                [action.part.id]: undefined,
            };
        case DELETE_CHORD:
            const part2 = state[action.partId];
            if (!part2) {
                return state;
            }
            const chordsWithoutChord = part2.chords.filter((chordId) => chordId !== action.chord.id);
            return {
                ...state,
                [part2.id]: {...part2, chords: chordsWithoutChord},
            };
        case CHANGE_CHORD_INDEX:
            const part3 = state[action.partId];
            if (!part3) {
                return state;
            }
            const chordIndex = part3.chords.indexOf(action.chordId);
            if ((chordIndex === -1) || chordIndex === action.desiredIndex) {
                return state;
            }
            const newChords = part3.chords.slice();
            newChords.splice(action.desiredIndex, 0, newChords.splice(chordIndex, 1)[0]);
            return {
                ...state,
                [part3.id]: {...part3, chords: newChords},
            };
        default:
            return state;
    }
};
