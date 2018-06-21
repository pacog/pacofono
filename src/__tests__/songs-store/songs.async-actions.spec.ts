import { duplicateSong, cascadeDeleteSong } from "store/actions/songs";
import createEmptyStore from "test-helpers/createEmptyStore";
import { getSong } from "store/selectors/songs";
import { getPartById } from "store/selectors/parts";
import { getChordById } from "store/selectors/chords";

const TEST_CHORD_1 = {
    id: "chord_1",
    name: "chord 1",
    notes: ["B", "C"],
};

const TEST_CHORD_2 = {
    id: "chord_2",
    name: "chord 2",
    notes: ["D", "F#"],
};

const TEST_PART = {
    id: "part_1",
    name: "bloch",
    chords: [TEST_CHORD_1.id],
};

const TEST_PART_2 = {
    id: "part_2",
    name: "blach",
    chords: [TEST_CHORD_2.id],
};

const TEST_SONG = {
    id: "song_1",
    name: "derp",
    parts: [TEST_PART.id, TEST_PART_2.id],
};

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
            const store = createEmptyStore(getMockStoreFirstState());
            const resultingSong = await store.dispatch(duplicateSong(TEST_SONG) as any);
            const copiedSongAsItShouldBe = {
                ...TEST_SONG,
                id: "uuid_1",
                parts: ["uuid_2", "uuid_4"],
            };
            expect(resultingSong).toEqual(copiedSongAsItShouldBe);
            const part1 = getPartById(store.getState(), "uuid_2");
            const part2 = getPartById(store.getState(), "uuid_4");
            const chord1 = getChordById(store.getState(), "uuid_3");
            const chord2 = getChordById(store.getState(), "uuid_5");
            expect(part1).toEqual({...TEST_PART, id: "uuid_2", chords: ["uuid_3"]});
            expect(part2).toEqual({...TEST_PART_2, id: "uuid_4", chords: ["uuid_5"]});
            expect(chord1).toEqual({...TEST_CHORD_1, id: "uuid_3"});
            expect(chord2).toEqual({...TEST_CHORD_2, id: "uuid_5"});
        });
    });

    describe("cascadeDeleteSong", () => {
        it("should work", async () => {
            expect.assertions(6);
            const store = createEmptyStore(getMockStoreFirstState());
            const deletedSong = await store.dispatch(cascadeDeleteSong(TEST_SONG) as any);
            expect(deletedSong).toEqual(TEST_SONG);
            expect(getSong(store.getState(), TEST_SONG.id)).toBe(undefined);
            expect(getPartById(store.getState(), TEST_PART.id)).toBe(undefined);
            expect(getPartById(store.getState(), TEST_PART_2.id)).toBe(undefined);
            expect(getChordById(store.getState(), TEST_CHORD_1.id)).toBe(undefined);
            expect(getChordById(store.getState(), TEST_CHORD_2.id)).toBe(undefined);
        });
    });

});

function getMockStoreFirstState() {
    return {
        songs: {
            [TEST_SONG.id]: TEST_SONG,
        },
        parts: {
            [TEST_PART.id]: TEST_PART,
            [TEST_PART_2.id]: TEST_PART_2,
        },
        chords: {
            [TEST_CHORD_1.id]: TEST_CHORD_1,
            [TEST_CHORD_2.id]: TEST_CHORD_2,
        },
    };
}
