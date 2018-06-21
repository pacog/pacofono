// import { Promise } from "es6-promise";
import { IChord } from "types";
// import { Dispatch } from "redux";
// import { IRootState } from "store/reducers/root";
// import { RootAction } from "store/actions";

export const ADD_CHORD = "ADD_CHORD";
export const DELETE_CHORD = "DELETE_CHORD";
export const CHANGE_CHORD_NAME = "CHANGE_CHORD_NAME";

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
};
