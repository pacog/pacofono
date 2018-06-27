import { getPartById } from "store/selectors/parts";
import { getChordById } from "store/selectors/chords";
import { duplicatePart, cascadeDeletePart } from "store/actions/parts";
import createEmptyStore from "test-helpers/createEmptyStore";

const TEST_CHORD = {
    id: "chord_1",
    name: "B chord",
    notes: ["B"],
};

const TEST_PART = {
    id: "part_1",
    name: "bloch",
    chords: [TEST_CHORD.id],
};

const TEST_PART_WITH_NO_CHORDS = {
    id: "part_3",
    name: "nochords",
    chords: ([] as string[]),
};

jest.mock("uuid", () => {
    let num = 1;
    return {
        v1: jest.fn(() => "uuid_" + (num++).toString()),
    };
});

describe("Parts store async actions", () => {

    describe("duplicatePart", () => {
        it("should work with a part with no chords", async () => {
            expect.assertions(2);
            const store = createEmptyStore({
                parts: {
                    [TEST_PART_WITH_NO_CHORDS.id]: TEST_PART_WITH_NO_CHORDS,
                },
            });
            const copiedPart = await store.dispatch(duplicatePart(TEST_PART_WITH_NO_CHORDS, "song_12") as any);
            const copiedPartAsItShouldBe = {
                ...TEST_PART_WITH_NO_CHORDS,
                id: "uuid_1",
            };
            expect(copiedPart).toEqual(copiedPartAsItShouldBe);
            expect(getPartById(store.getState(), "uuid_1")).toEqual(copiedPartAsItShouldBe);
        });

        it("should work with a part with chords", async () => {
            expect.assertions(3);
            const store = createEmptyStore({
                parts: {
                    [TEST_PART.id]: TEST_PART,
                },
                chords: {
                    [TEST_CHORD.id]: TEST_CHORD,
                },
            });
            const copiedPart = await store.dispatch(duplicatePart(TEST_PART, "song_12") as any);
            const copiedPartAsItShouldBe = {
                ...TEST_PART,
                id: "uuid_2",
                chords: ["uuid_3"],
            };
            const copiedChordAsItShouldBe = {
                ...TEST_CHORD,
                id: "uuid_3",
            };
            expect(copiedPart).toEqual(copiedPartAsItShouldBe);
            expect(getPartById(store.getState(), "uuid_2")).toEqual(copiedPartAsItShouldBe);
            expect(getChordById(store.getState(), "uuid_3")).toEqual(copiedChordAsItShouldBe);
        });
    });

    describe("cascadeDeletePart", () => {
        it("should work", async () => {
            expect.assertions(3);
            const store = createEmptyStore({
                parts: {
                    [TEST_PART.id]: TEST_PART,
                },
                chords: {
                    [TEST_CHORD.id]: TEST_CHORD,
                },
            });
            const deletedPart = await store.dispatch(cascadeDeletePart(TEST_PART, "song_12") as any);
            expect(deletedPart).toEqual(TEST_PART);
            expect(getPartById(store.getState(), TEST_PART.id)).toBe(undefined);
            expect(getChordById(store.getState(), TEST_CHORD.id)).toBe(undefined);
        });
    });

});
