import { Promise } from "es6-promise";
import { ISongPart } from "types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { RootAction } from "store/actions";
import { v1 as uuid } from "uuid";
import { getChordById } from "store/selectors/chords";
import { getPartById } from "store/selectors/parts";
import { actionCreators as chordsActions } from "store/actions/chords";
export const ADD_PART = "ADD_PART";
export const DELETE_PART = "DELETE_PART";
export const CHANGE_PART_NAME = "CHANGE_PART_NAME";

export interface IPartsActions {
    ADD_PART: {
        type: typeof ADD_PART,
        part: ISongPart,
        songId: string,
    };
    DELETE_PART: {
        type: typeof DELETE_PART,
        part: ISongPart,
        songId: string,
    };
    CHANGE_PART_NAME: {
        type: typeof CHANGE_PART_NAME,
        part: ISongPart,
        newName: string,
    };
}

export const actionCreators = {
    addPart: (part: ISongPart, songId: string): IPartsActions[typeof ADD_PART] => ({
        type: ADD_PART,
        part,
        songId,
    }),
    deletePart: (part: ISongPart, songId: string): IPartsActions[typeof DELETE_PART] => ({
        type: DELETE_PART,
        part,
        songId,
    }),
    changePartName: (part: ISongPart, newName: string): IPartsActions[typeof CHANGE_PART_NAME] => ({
        type: CHANGE_PART_NAME,
        part,
        newName,
    }),
};

export const cascadeDeletePart =
(part: ISongPart, songId: string): ThunkAction<Promise<ISongPart>, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): Promise<ISongPart> => {
        part.chords.forEach((chordId) => {
            const chordToDelete = getChordById(getState(), chordId);
            dispatch(chordsActions.deleteChord(chordToDelete, part.id));
        });
        dispatch(actionCreators.deletePart(part, songId));
        return new Promise((resolve) => {
            resolve(part);
        });
    };
};

export const duplicatePart =
(part: ISongPart, songId: string): ThunkAction<Promise<ISongPart>, IRootState, {}, RootAction> => {
    return (dispatch: Dispatch<RootAction>, getState: () => IRootState): Promise<ISongPart> => {
        const newPart = {...part, id: uuid(), chords: ([] as string[]) };
        dispatch(actionCreators.addPart(newPart, songId));
        part.chords.forEach((chordId) => {
            const chord = getChordById(getState(), chordId);
            const chordCopy = {...chord, id: uuid(), notes: chord.notes.slice()};
            dispatch(chordsActions.addChord(chordCopy, newPart.id));
        });
        const duplicatedPart = getPartById(getState(), newPart.id);
        return new Promise((resolve) => {
            resolve(duplicatedPart);
        });
    };
};
