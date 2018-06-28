import { duplicateSong, cascadeDeleteSong } from "store/actions/songs";
import createEmptyStore from "test-helpers/createEmptyStore";
import { getMockStore, data as mockData } from "test-helpers/mockStoreData";
import { getSong } from "store/selectors/songs";
import { getPartById } from "store/selectors/parts";
import { getChordById } from "store/selectors/chords";

jest.mock("uuid", () => {
    let num = 1;
    return {
        v1: jest.fn(() => "uuid_" + (num++).toString()),
    };
});

describe("Songs store async actions", () => {

    describe("duplicateSong", () => {
        it("should work", async () => {
            expect.assertions(5);
            const store = createEmptyStore(getMockStore());
            const resultingSong = await store.dispatch(duplicateSong(mockData.SONG_1) as any);
            const copiedSongAsItShouldBe = {
                ...mockData.SONG_1,
                id: "uuid_1",
                parts: ["uuid_2", "uuid_4"],
            };
            expect(resultingSong).toEqual(copiedSongAsItShouldBe);
            const part1 = getPartById(store.getState(), "uuid_2");
            const part2 = getPartById(store.getState(), "uuid_4");
            const chord1 = getChordById(store.getState(), "uuid_3");
            const chord2 = getChordById(store.getState(), "uuid_5");
            expect(part1).toEqual({...mockData.PART_1, id: "uuid_2", chords: ["uuid_3"]});
            expect(part2).toEqual({...mockData.PART_2, id: "uuid_4", chords: ["uuid_5"]});
            expect(chord1).toEqual({...mockData.CHORD_1, id: "uuid_3"});
            expect(chord2).toEqual({...mockData.CHORD_2, id: "uuid_5"});
        });
    });

    describe("cascadeDeleteSong", () => {
        it("should work", async () => {
            expect.assertions(6);
            const store = createEmptyStore(getMockStore());
            const deletedSong = await store.dispatch(cascadeDeleteSong(mockData.SONG_1) as any);
            expect(deletedSong).toEqual(mockData.SONG_1);
            expect(getSong(store.getState(), mockData.SONG_1.id)).toBe(undefined);
            expect(getPartById(store.getState(), mockData.PART_1.id)).toBe(undefined);
            expect(getPartById(store.getState(), mockData.PART_2.id)).toBe(undefined);
            expect(getChordById(store.getState(), mockData.CHORD_1.id)).toBe(undefined);
            expect(getChordById(store.getState(), mockData.CHORD_2.id)).toBe(undefined);
        });
    });

});
