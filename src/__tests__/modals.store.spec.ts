import { OPEN_SONG_EDITOR, CLOSE_SONG_EDITOR, actionCreators } from "store/actions/modals";
import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as songsActions } from "store/actions/songs";
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

        const newSong = {
            id: "id1",
            name: "Wind cries Marvin",
            parts: ([] as string[]),
        };

        it("should be able to get info about song editor modal", () => {
            const state = rootReducer({}, { type: null });
            expect(isSongEditorModalOpen(state)).toBe(false);
            const newState = rootReducer(state, actionCreators.openSongEditor());
            const newState2 = rootReducer(newState, songEditorActions.startEditingNewSong(newSong));
            const newState3 = rootReducer(newState2, songsActions.addSong(newSong));
            expect(isSongEditorModalOpen(newState3)).toBe(true);
        });

        it("should be able to get info about any open modal", () => {
            const state = rootReducer({}, { type: null });
            expect(isAnyModalOpen(state)).toBe(false);
            const newState = rootReducer(state, actionCreators.openSongEditor());
            expect(isAnyModalOpen(newState)).toBe(false); // Modal is closed until there is a song
            const newState2 = rootReducer(newState, songEditorActions.startEditingNewSong(newSong));
            const newState3 = rootReducer(newState2, songsActions.addSong(newSong));
            expect(isAnyModalOpen(newState3)).toBe(true);
            const newState4 = rootReducer(newState3, actionCreators.closeSongEditor());
            expect(isAnyModalOpen(newState4)).toBe(false);
        });
    });

});
