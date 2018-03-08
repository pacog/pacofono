import { START_EDITING_NEW_SONG, actionCreators } from "store/actions/songEditor";
import { songEditorReducer } from "store/reducers/songEditor";
import { rootReducer } from "store/reducers/root";
import { getSong, getOriginalSong, isNewSong, isEditingSong } from "store/selectors/songEditor";

describe("songEditor store", () => {

    describe("actions", () => {
        it("should have a start editing new song action", () => {
            const songToEdit = {
                id: "",
                name: "myNewSong",
            };
            expect(actionCreators.startEditingNewSong(songToEdit))
                .toEqual({
                    type: START_EDITING_NEW_SONG,
                    song: songToEdit,
                });
        });
    });

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.songEditor).toEqual({
                isNewSong: false,
                song: null,
                originalSong: null,
            });
        });

        it("should be able to start editing a song", () => {
            const songToStartEditing = {
                id: "",
                name: "myNewSong",
            };
            const initialState = rootReducer({}, { type: null });
            const stateAfter = songEditorReducer(
                initialState.songEditor,
                actionCreators.startEditingNewSong(songToStartEditing),
            );
            expect(stateAfter.isNewSong).toBe(true);
            expect(stateAfter.song).toEqual(songToStartEditing);
            expect(stateAfter.originalSong).toEqual(songToStartEditing);
             // Not the same object, so it is a copy:
            expect(stateAfter.originalSong).not.toBe(stateAfter.song);
        });
    });

    describe("selectors", () => {
        it("should work after starting to edit a song", () => {
            const songToStartEditing = {
                id: "",
                name: "myNewSong",
            };
            const state = rootReducer({}, { type: null });
            const newState = rootReducer(state, actionCreators.startEditingNewSong(songToStartEditing));
            expect(isNewSong(newState)).toBe(true);
            expect(isEditingSong(newState)).toBe(false);
            expect(getSong(newState)).toEqual(songToStartEditing);
            expect(getOriginalSong(newState)).toEqual(songToStartEditing);
        });
    });

});
