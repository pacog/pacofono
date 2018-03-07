import { IRootState } from "store/reducers/root";

export const isSongEditorModalOpen = (state: IRootState) => {
    return state.modals.songEditorOpen;
};

export const isAnyModalOpen = (state: IRootState) => {
    return isSongEditorModalOpen(state);
};
