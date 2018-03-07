import { IRootState } from "store/reducers/root";

export const isSongSelectorModalOpen = (state: IRootState) => {
    return state.modals.songEditorOpen;
};

export const isAnyModalOpen = (state: IRootState) => {
    return isSongSelectorModalOpen(state);
};
