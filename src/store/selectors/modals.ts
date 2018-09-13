import { IRootState } from "store/reducers/root";
import { getSong } from "store/selectors/songEditor";

export const isSongEditorModalOpen = (state: IRootState): boolean => {
    return state.modals.songEditorOpen && !!getSong(state);
};

export const isMainOptionsModalOpen = (state: IRootState): boolean => {
    return state.modals.mainOptionsOpen;
};

export const isSoundEditorModalOpen = (state: IRootState): boolean => {
    return state.modals.soundEditorOpen;
};

export const isAnyModalOpen = (state: IRootState): boolean => {
    return isSongEditorModalOpen(state) ||
        isMainOptionsModalOpen(state) ||
        isSoundEditorModalOpen(state);
};
