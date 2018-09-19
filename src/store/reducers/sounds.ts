import { RootAction } from "store/actions";

import { ISound } from "types";
import defaultSound from "constants/defaultSound";

export interface ISoundsState {
    readonly [id: string]: ISound;
}

const initialState: ISoundsState = {
    [defaultSound.id]: defaultSound,
};

export const soundsReducer = (state: ISoundsState = initialState, action: RootAction) => {
    switch (action.type) {
        default:
            return state;
    }
};
