import { ADD_SONG, DELETE_SONG, EDIT_SONG, actionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { songsReducer } from "store/reducers/songs";
import { getSong } from "store/selectors/songs";

const TEST_SONG = {
    id: "blach",
    name: "bloch",
};

describe("Song store", () => {

    describe("actions", () => {
        it("should have an add song action", () => {
            expect(actionCreators.addSong(TEST_SONG)).toEqual({
                type: ADD_SONG,
                song: TEST_SONG,
            });
        });

        it("should have a delete song action", () => {
            expect(actionCreators.deleteSong(TEST_SONG)).toEqual({
                type: DELETE_SONG,
                song: TEST_SONG,
            });
        });

        it("should have an edit song action", () => {
            expect(actionCreators.editSong(TEST_SONG)).toEqual({
                type: EDIT_SONG,
                song: TEST_SONG,
            });
        });
    });

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.songs).toEqual({});
        });

        it("should be able to add a song", () => {
            const songToAdd = {
                id: "newId",
                name: "myNewSong",
            };
            const initialState = rootReducer({}, { type: null });
            const stateAfter = songsReducer(
                initialState.songs,
                actionCreators.addSong(songToAdd),
            );
            const id = songToAdd.id;
            expect(stateAfter[id]).toEqual(songToAdd);
        });
    });

    describe("selectors", () => {
        describe("getSong selector", () => {
            it("should work after starting to edit a song", () => {
                const songToAdd = {
                    id: "id1",
                    name: "myNewSong",
                };
                const state = rootReducer({}, { type: null });
                expect(getSong(state, "id1")).toBe(undefined);

                const newState = rootReducer(state, actionCreators.addSong(songToAdd));
                expect(getSong(newState, "id1")).toEqual(songToAdd);
            });
        });
    });

});
