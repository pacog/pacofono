import { RootAction } from "store/actions";

export interface IMusicModeState {
    readonly mode: string;
}

const initialState: IMusicModeState = {
    mode: "song",
};

export const musicModeReducer = (state: IMusicModeState = initialState, action: RootAction) => {
    switch (action.type) {
        default:
            return state;
    }
};
