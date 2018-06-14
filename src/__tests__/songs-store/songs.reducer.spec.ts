import { actionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { songsReducer } from "store/reducers/songs";

describe("Song store ", () => {

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

    it("should be able to change the index of a part", () => {
        const song = {
            id: "song12",
            name: "myNewSong",
            parts: ["part_1", "part_2", "part_3"],
        };

        const initialState = rootReducer({}, { type: null });
        const stateAfter = songsReducer(
            initialState.songs,
            actionCreators.addSong(song),
        );

        const stateAfter2 = songsReducer(
            stateAfter,
            actionCreators.changePartIndex("song12", "part_2", 0),
        );
        expect(stateAfter2[song.id].parts).toEqual(["part_2", "part_1", "part_3"]);

        const stateAfter3 = songsReducer(
            stateAfter2,
            actionCreators.changePartIndex("song12", "part_2", 2),
        );
        expect(stateAfter3[song.id].parts).toEqual(["part_1", "part_3", "part_2"]);

        const stateAfter4 = songsReducer(
            stateAfter3,
            actionCreators.changePartIndex("song12", "part_2", 2),
        );
        expect(stateAfter4[song.id].parts).toEqual(["part_1", "part_3", "part_2"]);

        const stateAfter5 = songsReducer(
            stateAfter4,
            actionCreators.changePartIndex("song12", "part_2", 1),
        );
        expect(stateAfter5[song.id].parts).toEqual(["part_1", "part_2", "part_3"]);
    });
});
