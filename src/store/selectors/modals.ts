import { IRootState } from "store/reducers/root";
import { getSong } from "store/selectors/songEditor";

export const isSongEditorModalOpen = (state: IRootState) => {
    return state.modals.songEditorOpen && !!getSong(state);
};

export const isAnyModalOpen = (state: IRootState) => {
    return isSongEditorModalOpen(state);
};
