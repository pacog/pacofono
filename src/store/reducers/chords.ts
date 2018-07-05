import { RootAction } from "store/actions";
import { ADD_CHORD, DELETE_CHORD, CHANGE_CHORD_NAME, TOGGLE_NOTE } from "store/actions/chords";

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
        case TOGGLE_NOTE:
            return {
                ...state,
                [action.chord.id]: {...action.chord, notes: toggleNote(action.noteId, action.chord.notes) },
            };
        default:
            return state;
    }
};

function toggleNote(noteId: string, notes: string[]) {
    const noteIndex = notes.indexOf(noteId);
    if (noteIndex === -1) {
        return notes.concat([noteId]);
    }
    const notesRemovingNote = notes.slice();
    notesRemovingNote.splice(noteIndex, 1);
    return notesRemovingNote;
}
