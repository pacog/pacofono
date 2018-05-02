import { IRootState } from "store/reducers/root";

export const isOpen = (state: IRootState): boolean => {
    return state.songSelector.isOpen;
};
