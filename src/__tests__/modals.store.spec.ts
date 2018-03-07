import { OPEN_SONG_EDITOR, CLOSE_SONG_EDITOR, actionCreators } from "store/actions/modals";
import { modalsReducer } from "store/reducers/modals";
import { rootReducer } from "store/reducers/root";
import { isSongEditorModalOpen, isAnyModalOpen } from "store/selectors/modals";

describe("modals store", () => {

    describe("actions", () => {
        it("should have a open song editor action", () => {
            expect(actionCreators.openSongEditor())
                .toEqual({
                    type: OPEN_SONG_EDITOR,
                });
        });

        it("should have a close song editor action", () => {
            expect(actionCreators.closeSongEditor())
                .toEqual({
                    type: CLOSE_SONG_EDITOR,
                });
        });
    });

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.modals).toEqual({
                songEditorOpen: false,
            });
        });

        it("should process changing values", () => {
            const state = rootReducer({}, { type: null });
            const stateAfterOpening = modalsReducer(state.modals, actionCreators.openSongEditor());
            expect(stateAfterOpening)
                .toEqual({
                    songEditorOpen: true,
                });
            const stateAfterClosingAgain = modalsReducer(stateAfterOpening, actionCreators.closeSongEditor());
            expect(stateAfterClosingAgain)
                .toEqual({
                    songEditorOpen: false,
                });
        });
    });

    describe("selectors", () => {
        it("should be able to get info about song editor modal", () => {
            const state = rootReducer({}, { type: null });
            expect(isSongEditorModalOpen(state)).toBe(false);
            const newState = rootReducer(state, actionCreators.openSongEditor());
            expect(isSongEditorModalOpen(newState)).toBe(true);
        });

        it("should be able to get info about any open modal", () => {
            const state = rootReducer({}, { type: null });
            expect(isAnyModalOpen(state)).toBe(false);
            const newState = rootReducer(state, actionCreators.openSongEditor());
            expect(isAnyModalOpen(newState)).toBe(true);
            const newState2 = rootReducer(newState, actionCreators.closeSongEditor());
            expect(isAnyModalOpen(newState2)).toBe(false);
        });
    });

});
