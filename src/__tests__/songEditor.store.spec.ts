import {
    START_EDITING_NEW_SONG,
    STOP_EDITING,
    START_EDITING_EXISTING_SONG,
    SHOW_CONFIRM_RESTORE_DEFAULTS,
    SHOW_CONFIRM_DELETE_SONG,
    actionCreators,
} from "store/actions/songEditor";
import { actionCreators as songsActionCreators } from "store/actions/songs";
import { songEditorReducer } from "store/reducers/songEditor";
import { rootReducer } from "store/reducers/root";
import { getSong,
    getOriginalSong,
    isNewSong,
    isEditingSong,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
} from "store/selectors/songEditor";

describe("songEditor store", () => {

    describe("actions", () => {
        it("should have a start editing new song action", () => {
            const songToEdit = {
                id: "111",
                name: "myNewSong",
            };
            expect(actionCreators.startEditingNewSong(songToEdit))
                .toEqual({
                    type: START_EDITING_NEW_SONG,
                    song: songToEdit,
                });
        });

        it("should have a stop editing action", () => {
            expect(actionCreators.stopEditing())
                .toEqual({
                    type: STOP_EDITING,
                });
        });

        it("should have a start editing existing song action", () => {
            const originalSong = {
                id: "111",
                name: "myNewSong",
            };
            const songToEdit = {
                id: "112",
                name: "myNewCopiedSong",
            };
            expect(actionCreators.startEditingExistingSong(songToEdit, originalSong))
                .toEqual({
                    type: START_EDITING_EXISTING_SONG,
                    originalSong,
                    song: songToEdit,
                });
        });

        it("should have a show confirm restore defaults action", () => {
            expect(actionCreators.showConfirmRestoreDefaults(true))
                .toEqual({
                    type: SHOW_CONFIRM_RESTORE_DEFAULTS,
                    shouldShow: true,
                });
            expect(actionCreators.showConfirmRestoreDefaults(false))
                .toEqual({
                    type: SHOW_CONFIRM_RESTORE_DEFAULTS,
                    shouldShow: false,
                });
        });

        it("should have a show confirm delete song action", () => {
            expect(actionCreators.showConfirmDeleteSong(true))
                .toEqual({
                    type: SHOW_CONFIRM_DELETE_SONG,
                    shouldShow: true,
                });
            expect(actionCreators.showConfirmDeleteSong(false))
                .toEqual({
                    type: SHOW_CONFIRM_DELETE_SONG,
                    shouldShow: false,
                });
        });
    });

    describe("reducer", () => {
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
            };
            const songToStartEditing = {
                id: "112",
                name: "myNewCopiedSong",
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

    describe("selectors", () => {
        it("should work after starting to edit a song", () => {
            const songToStartEditing = {
                id: "id_edit_2",
                name: "myNewSong",
            };
            const state = rootReducer({}, { type: null });
            const newState = rootReducer(state, actionCreators.startEditingNewSong(songToStartEditing));
            const newState2 = rootReducer(newState, songsActionCreators.addSong(songToStartEditing));
            expect(isNewSong(newState2)).toBe(true);
            expect(isEditingSong(newState2)).toBe(false);
            expect(getSong(newState2)).toEqual(songToStartEditing);
            expect(getOriginalSong(newState2)).toEqual(null);
        });

        it("should have correct confirm restore song selectors", () => {
            const state = rootReducer({}, { type: null });
            expect(isShowingConfirmRestoreDefaults(state)).toBe(false);
            const newState = rootReducer(
                state,
                actionCreators.showConfirmRestoreDefaults(true),
            );
            expect(isShowingConfirmRestoreDefaults(newState)).toBe(true);
            const newState2 = rootReducer(
                newState,
                actionCreators.showConfirmRestoreDefaults(false),
            );
            expect(isShowingConfirmRestoreDefaults(newState2)).toBe(false);
        });

        it("should have correct confirm delete song selectors", () => {
            const state = rootReducer({}, { type: null });
            expect(isShowingConfirmDeleteSong(state)).toBe(false);
            const newState = rootReducer(
                state,
                actionCreators.showConfirmDeleteSong(true),
            );
            expect(isShowingConfirmDeleteSong(newState)).toBe(true);
            const newState2 = rootReducer(
                newState,
                actionCreators.showConfirmDeleteSong(false),
            );
            expect(isShowingConfirmDeleteSong(newState2)).toBe(false);
        });
    });

});
