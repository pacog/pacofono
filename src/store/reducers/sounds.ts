import { RootAction } from "store/actions";
import { CHANGE_SYNTH_TYPE } from "store/actions/sounds";
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
        case CHANGE_SYNTH_TYPE:
            return {
                ...state,
                [action.sound.id]: {...action.sound, synthType: action.newType },
            };
        default:
            return state;
    }
};
