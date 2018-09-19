import { RootAction } from "store/actions";
import defaultSound from "constants/defaultSound";

export interface ICurrentSoundState {
    readonly id: string;
}

const initialState: ICurrentSoundState = {
    id: defaultSound.id,
};

export const currentSoundReducer = (state: ICurrentSoundState = initialState, action: RootAction) => {
    switch (action.type) {
        default:
            return state;
    }
};
