import { RootAction } from "store/actions";
import { OPEN_SONG_EDITOR, CLOSE_SONG_EDITOR } from "store/actions/modals";

export interface IModalsState {
    readonly songEditorOpen: boolean;
}

const initialState: IModalsState = {
    songEditorOpen: false,
};

export const modalsReducer = (state: IModalsState = initialState, action: RootAction) => {
    switch (action.type) {
        case OPEN_SONG_EDITOR:
            return { ...state, songEditorOpen: true };
        case CLOSE_SONG_EDITOR:
            return { ...state, songEditorOpen: false };
        default:
            return state;
    }
};
