import { IRootState } from "store/reducers/root";
import { ISongPart } from "types";
import { getPartById } from "store/selectors/parts";

export const getCurrentSongPart = (state: IRootState): ISongPart => {
    if (state.currentSongPart.id === null) {
        return null;
    }
    return getPartById(state, state.currentSongPart.id);
};

export const isCurrentSongPart = (state: IRootState, part: ISongPart): boolean => {
    if (!part) {
        return false;
    }
    const currentSongPart = getCurrentSongPart(state);
    if (currentSongPart === null) {
        return false;
    }
    return currentSongPart.id === part.id;
};
