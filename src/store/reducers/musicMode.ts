import { RootAction } from "store/actions";
import { CHANGE_MUSIC_MODE } from "store/actions/musicMode";
import { SONG } from "constants/musicModes";

export interface IMusicModeState {
    readonly mode: string;
}

const initialState: IMusicModeState = {
    mode: SONG,
};

export const musicModeReducer = (state: IMusicModeState = initialState, action: RootAction) => {
    switch (action.type) {
        case CHANGE_MUSIC_MODE:
            return { ...state, mode: action.newMode};
        default:
            return state;
    }
};
