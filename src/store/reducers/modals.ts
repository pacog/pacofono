import { RootAction } from "store/actions";
import {
    OPEN_SONG_EDITOR,
    CLOSE_SONG_EDITOR,
    OPEN_MAIN_OPTIONS,
    CLOSE_MAIN_OPTIONS,
    OPEN_SOUND_EDITOR,
    CLOSE_SOUND_EDITOR,
} from "store/actions/modals";

export interface IModalsState {
    readonly songEditorOpen: boolean;
    readonly mainOptionsOpen: boolean;
    readonly soundEditorOpen: boolean;
}

const initialState: IModalsState = {
    songEditorOpen: false,
    mainOptionsOpen: false,
    soundEditorOpen: false,
};

export const modalsReducer = (state: IModalsState = initialState, action: RootAction) => {
    switch (action.type) {
        case OPEN_SONG_EDITOR:
            return { ...state, songEditorOpen: true };
        case CLOSE_SONG_EDITOR:
            return { ...state, songEditorOpen: false };
        case OPEN_MAIN_OPTIONS:
            return { ...state, mainOptionsOpen: true };
        case CLOSE_MAIN_OPTIONS:
            return { ...state, mainOptionsOpen: false };
        case OPEN_SOUND_EDITOR:
            return { ...state, soundEditorOpen: true };
        case CLOSE_SOUND_EDITOR:
            return { ...state, soundEditorOpen: false };
        default:
            return state;
    }
};
