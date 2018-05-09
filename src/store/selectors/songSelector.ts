import { IRootState } from "store/reducers/root";
import { getCurrentSong } from "./currentSong";
export const isOpen = (state: IRootState): boolean => {
    return state.songSelector.isOpen || !getCurrentSong(state);
};
