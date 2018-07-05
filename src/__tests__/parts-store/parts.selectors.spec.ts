import { rootReducer } from "store/reducers/root";
import { getSongParts, getPartById } from "store/selectors/parts";
import createEmptyStore from "test-helpers/createEmptyStore";
import { getMockStore, data as mockData } from "test-helpers/mockStoreData";

const exampleSong = {
    name: "Song 12",
    id: "song_12",
    parts: ["other_part"],
};

describe("Parts store selectors", () => {

    describe("getPartById selector", () => {
        it("should work", () => {
            const store = createEmptyStore(getMockStore());
            const state = store.getState();
            expect(getPartById(state, "not_here_part")).toBe(undefined);
            expect(getPartById(state, mockData.PART_1.id)).toEqual(mockData.PART_1);
        });
    });

    describe("getSongParts selector", () => {
        it("should work with no parts", () => {
            const initialState = rootReducer({
                songs: {
                    song_12: {...exampleSong, parts: []},
                },
            }, { type: null });
            expect(getSongParts(initialState, "song_12")).toEqual([]);
        });

        it("should work with parts", () => {
            const partToGet = {
                id: "part_14",
                name: "myNewPart",
                chords: ["chord_27"],
            };
            const partToGet2 = {
                id: "part_1",
                name: "myNewPart1",
                chords: ["chord_22"],
            };
            const initialState = rootReducer({
                songs: {
                    song_12: {...exampleSong, parts: ["part_1", "part_14"]},
                },
                parts: {
                    part_14: partToGet,
                    part_1: partToGet2,
                },
            }, { type: null });
            expect(getSongParts(initialState, "song_12")).toEqual([partToGet2, partToGet]);
        });
    });

});
