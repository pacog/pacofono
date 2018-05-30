import { RootAction } from "store/actions";
import { ADD_PART, CHANGE_PART_NAME, DELETE_PART } from "store/actions/parts";

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
        default:
            return state;
    }
};
