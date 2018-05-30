import { ISongPart } from "types";
// import { Dispatch } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { IRootState } from "store/reducers/root";
// import { RootAction } from "store/actions";
// import * as uuid from "uuid/v1";

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
