import { RootAction } from "store/actions";
import { SET_CURRENT_PART } from "store/actions/currentSongPart";

export interface ICurrentSongPartState {
    readonly id: string;
}

const initialState: ICurrentSongPartState = {
    id: null,
};

export const currentSongPartReducer = (state: ICurrentSongPartState = initialState, action: RootAction) => {
    switch (action.type) {
        case SET_CURRENT_PART:
            if (action.part === null) {
                return { ...state, id: null };
            } else {
                return { ...state, id: action.part.id };
            }
        default:
            return state;
    }
};
