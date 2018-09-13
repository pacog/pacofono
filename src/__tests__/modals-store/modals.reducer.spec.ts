import { actionCreators } from "store/actions/modals";
import { modalsReducer } from "store/reducers/modals";
import { rootReducer } from "store/reducers/root";

describe("modals store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.modals).toEqual({
            songEditorOpen: false,
            mainOptionsOpen: false,
            soundEditorOpen: false,
        });
    });

    it("should process changing values for song editor", () => {
        const state = rootReducer({}, { type: null });
        const stateAfterOpening = modalsReducer(state.modals, actionCreators.openSongEditor());
        expect(stateAfterOpening)
            .toEqual({
                songEditorOpen: true,
                mainOptionsOpen: false,
                soundEditorOpen: false,
            });
        const stateAfterClosingAgain = modalsReducer(stateAfterOpening, actionCreators.closeSongEditor());
        expect(stateAfterClosingAgain)
            .toEqual({
                songEditorOpen: false,
                mainOptionsOpen: false,
                soundEditorOpen: false,
            });
    });

    it("should process changing values for main options", () => {
        const state = rootReducer({}, { type: null });
        const stateAfterOpening = modalsReducer(state.modals, actionCreators.openMainOptions());
        expect(stateAfterOpening)
            .toEqual({
                songEditorOpen: false,
                mainOptionsOpen: true,
                soundEditorOpen: false,
            });
        const stateAfterClosingAgain = modalsReducer(stateAfterOpening, actionCreators.closeMainOptions());
        expect(stateAfterClosingAgain)
            .toEqual({
                songEditorOpen: false,
                mainOptionsOpen: false,
                soundEditorOpen: false,
            });
    });

    it("should process changing values for sound editor", () => {
        const state = rootReducer({}, { type: null });
        const stateAfterOpening = modalsReducer(state.modals, actionCreators.openSoundEditor());
        expect(stateAfterOpening)
            .toEqual({
                songEditorOpen: false,
                mainOptionsOpen: false,
                soundEditorOpen: true,
            });
        const stateAfterClosingAgain = modalsReducer(stateAfterOpening, actionCreators.closeSoundEditor());
        expect(stateAfterClosingAgain)
            .toEqual({
                songEditorOpen: false,
                mainOptionsOpen: false,
                soundEditorOpen: false,
            });
    });
});
