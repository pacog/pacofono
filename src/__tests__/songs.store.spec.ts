import { ADD_SONG, DELETE_SONG, EDIT_SONG, actionCreators } from "store/actions/songs";

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

    // TODO Do reducers
    // TODO Do selectors

});
