import { ISongPart } from "types";

export const SET_CURRENT_PART = "SET_CURRENT_PART";

export interface ICurrentSongPartActions {
    SET_CURRENT_PART: {
        type: typeof SET_CURRENT_PART,
        part: ISongPart,
    };
}

export const actionCreators = {
    setCurrentPart: (part: ISongPart): ICurrentSongPartActions[typeof SET_CURRENT_PART] => ({
        type: SET_CURRENT_PART,
        part,
    }),
};
