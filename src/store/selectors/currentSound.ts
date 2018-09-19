import { IRootState } from "store/reducers/root";
import { ISound } from "types";
import { getSound as getSoundFromSoundStore } from "store/selectors/sounds";

export const getCurrentSound = (state: IRootState): ISound => {
    if (state.currentSound.id === null) {
        return null;
    }
    return getSoundFromSoundStore(state, state.currentSound.id);
};
