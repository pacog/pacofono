import { RootAction } from "store/actions";
import { OPEN_SONG_SELECTOR, CLOSE_SONG_SELECTOR } from "store/actions/songSelector";

export interface ISongSelectorState {
    readonly isOpen: boolean;
}

const initialState: ISongSelectorState = {
    isOpen: false,
};

export const songSelectorReducer = (state: ISongSelectorState = initialState, action: RootAction) => {
    switch (action.type) {
        case OPEN_SONG_SELECTOR:
            return {...state, isOpen: true};
        case CLOSE_SONG_SELECTOR:
            return {...state, isOpen: false};
        default:
            return state;
    }
};
