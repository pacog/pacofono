import { actionCreators } from "store/actions/songEditor";
import { songEditorReducer } from "store/reducers/songEditor";
import { rootReducer } from "store/reducers/root";

describe("songEditor store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.songEditor).toEqual({
            isNewSong: false,
            songId: null,
            originalSongId: null,
            isShowingConfirmRestoreDefaults: false,
            isShowingConfirmDeleteSong: false,
        });
    });

    it("should be able to start editing a song, then stop", () => {
        const songToStartEditing = {
            id: "id_edit",
            name: "myNewSong",
            parts: ["partId"],
        };
        const initialState = rootReducer({}, { type: null });
        const stateAfter = songEditorReducer(
            initialState.songEditor,
            actionCreators.startEditingNewSong(songToStartEditing),
        );
        expect(stateAfter.isNewSong).toBe(true);
        expect(stateAfter.songId).toEqual(songToStartEditing.id);
        expect(stateAfter.originalSongId).toEqual(null);

        const stateAfter2 = songEditorReducer(
            stateAfter,
            actionCreators.stopEditing(),
        );
        expect(stateAfter2.isNewSong).toBe(false);
        expect(stateAfter2.songId).toEqual(null);
        expect(stateAfter2.originalSongId).toEqual(null);
    });

    it("should be able to start editing an existing song, then stop", () => {
        const originalSong = {
            id: "111",
            name: "myNewCopiedSong",
            parts: ["partId"],
        };
        const songToStartEditing = {
            id: "112",
            name: "myNewCopiedSong",
            parts: ["partId"],
        };
        const initialState = rootReducer({}, { type: null });
        const stateAfter = songEditorReducer(
            initialState.songEditor,
            actionCreators.startEditingExistingSong(songToStartEditing, originalSong),
        );
        expect(stateAfter.isNewSong).toBe(false);
        expect(stateAfter.songId).toEqual(songToStartEditing.id);
        expect(stateAfter.originalSongId).toEqual("111");

        const stateAfter2 = songEditorReducer(
            stateAfter,
            actionCreators.stopEditing(),
        );
        expect(stateAfter2.isNewSong).toBe(false);
        expect(stateAfter2.songId).toEqual(null);
        expect(stateAfter2.originalSongId).toEqual(null);
    });

    it("should be able to show and hide the confirm restoring defaults", () => {
        const initialState = rootReducer({}, { type: null });
        const stateAfter = songEditorReducer(
            initialState.songEditor,
            actionCreators.showConfirmRestoreDefaults(true),
        );
        expect(stateAfter.isShowingConfirmRestoreDefaults).toBe(true);
        const stateAfter2 = songEditorReducer(
            stateAfter,
            actionCreators.showConfirmRestoreDefaults(false),
        );
        expect(stateAfter2.isShowingConfirmRestoreDefaults).toBe(false);
    });

    it("should be able to show and hide the confirm delete song", () => {
        const initialState = rootReducer({}, { type: null });
        const stateAfter = songEditorReducer(
            initialState.songEditor,
            actionCreators.showConfirmDeleteSong(true),
        );
        expect(stateAfter.isShowingConfirmDeleteSong).toBe(true);
        const stateAfter2 = songEditorReducer(
            stateAfter,
            actionCreators.showConfirmDeleteSong(false),
        );
        expect(stateAfter2.isShowingConfirmDeleteSong).toBe(false);
    });
});
