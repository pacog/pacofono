import createEmptyStore from "test-helpers/createEmptyStore";
import {
    openForNewSong,
} from "store/actions/songEditor";
import { getSong, getOriginalSong } from "store/selectors/songEditor";
import { isSongEditorModalOpen } from "store/selectors/modals";
import { getPartById } from "store/selectors/parts";
import { getChordById } from "store/selectors/chords";

jest.mock("uuid", () => {
    let num = 1;
    return {
        v1: jest.fn(() => "uuid_" + (num++).toString()),
    };
});

describe("songEditor store async actions", () => {

    describe("saveSongBeingEdited", () => {
    // TODO
    });

    describe("restoreDefaults", () => {
        // TODO do test with normal reducer
    });

    describe("openForNewSong", () => {
        it("should work when editing song", async () => {
            expect.assertions(6);
            const store = createEmptyStore();
            const newSong = await store.dispatch(openForNewSong() as any);
            const state = store.getState();
            expect(isSongEditorModalOpen(state)).toBe(true);
            const expectedSong = {
                id: "uuid_1",
                name: "La cucaracha",
                parts: ["uuid_2"],
            };
            const expectedNewPart = {
                id: "uuid_2",
                name: "Part 1",
                chords: ["uuid_3"],
            };
            const expectedNewChord = {
                id: "uuid_3",
                name: "New chord",
                notes: ([] as string[]),
            };
            expect(getSong(state)).toEqual(expectedSong);
            expect(getPartById(state, "uuid_2")).toEqual(expectedNewPart);
            expect(getChordById(state, "uuid_3")).toEqual(expectedNewChord);
            expect(newSong).toEqual(expectedSong);
            expect(getOriginalSong(state)).toBe(null);
        });
    });

    describe("deletePartAndSelectOther", () => {
        // TODO
    });

});
