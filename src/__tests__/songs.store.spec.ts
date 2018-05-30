import { ADD_SONG, DELETE_SONG, CHANGE_SONG_NAME, actionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { songsReducer } from "store/reducers/songs";
import { getSong } from "store/selectors/songs";

const TEST_SONG = {
    id: "blach",
    name: "bloch",
    parts: ["partId"],
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

        it("should have a change song name action", () => {
            const newName = "new name";
            expect(actionCreators.changeSongName(TEST_SONG, newName)).toEqual({
                type: CHANGE_SONG_NAME,
                song: TEST_SONG,
                newName,
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
                parts: ["partId"],
            };
            const initialState = rootReducer({}, { type: null });
            const stateAfter = songsReducer(
                initialState.songs,
                actionCreators.addSong(songToAdd),
            );
            const id = songToAdd.id;
            expect(stateAfter[id]).toEqual(songToAdd);
        });

        it("should be able to change the name of a song", () => {
            const songToAdd = {
                id: "newId",
                name: "myNewSong",
                parts: ["partId"],
            };
            const initialState = rootReducer({}, { type: null });
            const stateAfter = songsReducer(
                initialState.songs,
                actionCreators.addSong(songToAdd),
            );
            const stateAfterRename = songsReducer(
                stateAfter,
                actionCreators.changeSongName(songToAdd, "stairway"),
            );
            const id = songToAdd.id;
            expect(stateAfterRename[id].name).toEqual("stairway");
        });

        it("should be able to delete a song", () => {
            const songToAdd = {
                id: "newId",
                name: "myNewSong",
                parts: ["partId"],
            };
            const otherSongToAdd = {
                id: "newId2",
                name: "myNewSong2",
                parts: ["partId"],
            };
            const initialState = rootReducer({}, { type: null });
            const stateAfter = songsReducer(
                initialState.songs,
                actionCreators.addSong(songToAdd),
            );
            const stateAfter2 = songsReducer(
                stateAfter,
                actionCreators.addSong(otherSongToAdd),
            );
            expect(stateAfter2[songToAdd.id]).toEqual(songToAdd);
            expect(stateAfter2[otherSongToAdd.id]).toEqual(otherSongToAdd);
            const stateAfter3 = songsReducer(
                stateAfter2,
                actionCreators.deleteSong(songToAdd),
            );
            expect(stateAfter3[songToAdd.id]).toEqual(undefined);
            expect(stateAfter3[otherSongToAdd.id]).toEqual(otherSongToAdd);
            const stateAfter4 = songsReducer(
                stateAfter3,
                actionCreators.deleteSong(otherSongToAdd),
            );
            expect(stateAfter4[songToAdd.id]).toEqual(undefined);
            expect(stateAfter4[otherSongToAdd.id]).toEqual(undefined);
        });
    });

    describe("selectors", () => {
        describe("getSong selector", () => {
            it("should work after starting to edit a song", () => {
                const songToAdd = {
                    id: "id1",
                    name: "myNewSong",
                    parts: ["partId"],
                };
                const state = rootReducer({}, { type: null });
                expect(getSong(state, "id1")).toBe(undefined);

                const newState = rootReducer(state, actionCreators.addSong(songToAdd));
                expect(getSong(newState, "id1")).toEqual(songToAdd);
            });
        });
    });

});
