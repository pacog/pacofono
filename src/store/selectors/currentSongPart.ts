import { IRootState } from "store/reducers/root";
import { ISongPart, IChord } from "types";
import { getPartById } from "store/selectors/parts";
import { getPartChords } from "store/selectors/chords";

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

export const getCurrentChords = (state: IRootState): IChord[] => {
    const currentPart = getCurrentSongPart(state);
    if (!currentPart) {
        return null;
    }
    return getPartChords(state, currentPart);
};
