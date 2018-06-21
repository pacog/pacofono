import { RootAction } from "store/actions";
import { ADD_CHORD, DELETE_CHORD, CHANGE_CHORD_NAME } from "store/actions/chords";

import { IChord } from "types";

export interface IChordsState {
    readonly [id: string]: IChord;
}

const initialState: IChordsState = {};

export const chordsReducer = (state: IChordsState = initialState, action: RootAction) => {
    switch (action.type) {
        case ADD_CHORD:
            return {
                ...state,
                [action.chord.id]: {...action.chord},
            };
        case CHANGE_CHORD_NAME:
            return {
                ...state,
                [action.chord.id]: {...action.chord, name: action.newName },
            };
        case DELETE_CHORD:
            return {
                ...state,
                [action.chord.id]: undefined,
            };
        default:
            return state;
    }
};
