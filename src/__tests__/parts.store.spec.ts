import { ADD_PART, DELETE_PART, CHANGE_PART_NAME, actionCreators } from "store/actions/parts";
import { rootReducer } from "store/reducers/root";
import { partsReducer } from "store/reducers/parts";
// import { getSong } from "store/selectors/songs";

const TEST_PART = {
    id: "blach",
    name: "bloch",
    chords: ["chordId"],
};

describe("Parts store", () => {

    describe("actions", () => {
        it("should have an add part action", () => {
            const songId = "song_34";
            expect(actionCreators.addPart(TEST_PART, songId)).toEqual({
                type: ADD_PART,
                part: TEST_PART,
                songId,
            });
        });

        it("should have a delete part action", () => {
            const songId = "song_34";
            expect(actionCreators.deletePart(TEST_PART, songId)).toEqual({
                type: DELETE_PART,
                part: TEST_PART,
                songId,
            });
        });

        it("should have a change part name action", () => {
            const newName = "new name";
            expect(actionCreators.changePartName(TEST_PART, newName)).toEqual({
                type: CHANGE_PART_NAME,
                part: TEST_PART,
                newName,
            });
        });

    });

    describe("reducer", () => {
        const exampleSong = {
            name: "Song 12",
            id: "song_12",
            parts: ["other_part"],
        };

        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.parts).toEqual({});
        });

        it("should be able to add a part", () => {
            const songId = "song_12";
            const partToAdd = {
                id: "newPartId",
                name: "myNewPart",
                chords: ["chord_27"],
            };
            const initialState = rootReducer({
                songs: {
                    song_12: {...exampleSong},
                },
            }, { type: null });
            const stateAfter = rootReducer(
                initialState,
                actionCreators.addPart(partToAdd, songId),
            );
            const id = partToAdd.id;
            expect(stateAfter.parts[id]).toEqual(partToAdd);
            expect(stateAfter.songs.song_12.parts).toEqual(["other_part", "newPartId"]);
        });

        it("should be able to change the name of a part", () => {
            const songId = "song_12";
            const partToAdd = {
                id: "newId",
                name: "Chorus",
                chords: ["chord_123"],
            };
            const initialState = rootReducer({}, { type: null });
            const stateAfter = partsReducer(
                initialState.parts,
                actionCreators.addPart(partToAdd, songId),
            );
            const stateAfterRename = partsReducer(
                stateAfter,
                actionCreators.changePartName(partToAdd, "ChorusNew"),
            );
            const id = partToAdd.id;
            expect(stateAfterRename[id].name).toEqual("ChorusNew");
        });

        it("should be able to delete a part", () => {
            const songId = "song_12";
            const partToAdd = {
                id: "newPartId",
                name: "myNewPart",
                chords: ["chord_27"],
            };
            const initialState = rootReducer({
                songs: {
                    song_12: {...exampleSong},
                },
            }, { type: null });
            const stateAfter = rootReducer(
                initialState,
                actionCreators.addPart(partToAdd, songId),
            );
            const stateAfter2 = rootReducer(
                stateAfter,
                actionCreators.deletePart(partToAdd, songId),
            );
            const id = partToAdd.id;
            expect(stateAfter2.parts[id]).toEqual(undefined);
            expect(stateAfter2.songs.song_12.parts).toEqual(["other_part"]);
        });
    });
    //
    // describe("selectors", () => {
    //     describe("getSong selector", () => {
    //         it("should work after starting to edit a song", () => {
    //             const songToAdd = {
    //                 id: "id1",
    //                 name: "myNewSong",
    //                 parts: ["partId"],
    //             };
    //             const state = rootReducer({}, { type: null });
    //             expect(getSong(state, "id1")).toBe(undefined);
    //
    //             const newState = rootReducer(state, actionCreators.addSong(songToAdd));
    //             expect(getSong(newState, "id1")).toEqual(songToAdd);
    //         });
    //     });
    // });

});
