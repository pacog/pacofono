import { START_EDITING_NEW_SONG, STOP_EDITING, actionCreators } from "store/actions/songEditor";
import { actionCreators as songsActionCreators } from "store/actions/songs";
import { songEditorReducer } from "store/reducers/songEditor";
import { rootReducer } from "store/reducers/root";
import { getSong, getOriginalSong, isNewSong, isEditingSong } from "store/selectors/songEditor";

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
    });

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.songEditor).toEqual({
                isNewSong: false,
                songId: null,
                originalSongId: null,
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
    });

});
