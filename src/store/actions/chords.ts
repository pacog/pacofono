import { IChord } from "types";
export const ADD_CHORD = "ADD_CHORD";
export const DELETE_CHORD = "DELETE_CHORD";
export const CHANGE_CHORD_NAME = "CHANGE_CHORD_NAME";
export const TOGGLE_NOTE = "TOGGLE_NOTE";

export interface IChordsActions {
    ADD_CHORD: {
        type: typeof ADD_CHORD,
        chord: IChord,
        partId: string,
    };
    DELETE_CHORD: {
        type: typeof DELETE_CHORD,
        chord: IChord,
        partId: string,
    };
    CHANGE_CHORD_NAME: {
        type: typeof CHANGE_CHORD_NAME,
        chord: IChord,
        newName: string,
    };
    TOGGLE_NOTE: {
        type: typeof TOGGLE_NOTE,
        chord: IChord,
        noteId: string,
    };
}

export const actionCreators = {
    addChord: (chord: IChord, partId: string): IChordsActions[typeof ADD_CHORD] => ({
        type: ADD_CHORD,
        chord,
        partId,
    }),
    deleteChord: (chord: IChord, partId: string): IChordsActions[typeof DELETE_CHORD] => ({
        type: DELETE_CHORD,
        chord,
        partId,
    }),
    changeChordName: (chord: IChord, newName: string): IChordsActions[typeof CHANGE_CHORD_NAME] => ({
        type: CHANGE_CHORD_NAME,
        chord,
        newName,
    }),
    toggleNote: (chord: IChord, noteId: string): IChordsActions[typeof TOGGLE_NOTE] => ({
        type: TOGGLE_NOTE,
        chord,
        noteId,
    }),
};
