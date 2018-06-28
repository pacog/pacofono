import createEmptyStore from "test-helpers/createEmptyStore";
import { getMockStore, data as mockData } from "test-helpers/mockStoreData";
import {
    openForNewSong,
    openForExistingSong,
} from "store/actions/songEditor";
import {
    getSong,
    getOriginalSong,
    getPartBeingEdited,
    getChordBeingEdited,
    getChordsFromPartBeingEdited,
} from "store/selectors/songEditor";
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
        it("should work when opening", async () => {
            expect.assertions(9);
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
            expect(getPartBeingEdited(state)).toEqual(expectedNewPart);
            expect(getChordBeingEdited(state)).toEqual(expectedNewChord);
            expect(getChordsFromPartBeingEdited(state)).toEqual([expectedNewChord]);
            expect(newSong).toEqual(expectedSong);
            expect(getOriginalSong(state)).toBe(null);
        });
    });

    describe("openForExistingSong", () => {
        it("should work when editing song", async () => {
            expect.assertions(11);
            const store = createEmptyStore(getMockStore());
            const newSong = await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            const state = store.getState();
            expect(isSongEditorModalOpen(state)).toBe(true);
            const expectedSong = {
                id: "uuid_4",
                name: mockData.SONG_1.name,
                parts: ["uuid_5", "uuid_7"],
            };
            const expectedNewPart1 = {
                id: "uuid_5",
                name: mockData.PART_1.name,
                chords: ["uuid_6"],
            };
            const expectedNewPart2 = {
                id: "uuid_7",
                name: mockData.PART_2.name,
                chords: ["uuid_8"],
            };
            const expectedNewChord1 = {
                id: "uuid_6",
                name: mockData.CHORD_1.name,
                notes: mockData.CHORD_1.notes,
            };
            const expectedNewChord2 = {
                id: "uuid_8",
                name: mockData.CHORD_2.name,
                notes: mockData.CHORD_2.notes,
            };
            expect(getSong(state)).toEqual(expectedSong);
            expect(getPartById(state, "uuid_5")).toEqual(expectedNewPart1);
            expect(getPartById(state, "uuid_7")).toEqual(expectedNewPart2);
            expect(getChordById(state, "uuid_6")).toEqual(expectedNewChord1);
            expect(getChordById(state, "uuid_8")).toEqual(expectedNewChord2);
            expect(getPartBeingEdited(state)).toEqual(expectedNewPart1);
            expect(getChordBeingEdited(state)).toEqual(expectedNewChord1);
            expect(getChordsFromPartBeingEdited(state)).toEqual([expectedNewChord1]);
            expect(newSong).toEqual(expectedSong);
            expect(getOriginalSong(state)).toEqual(mockData.SONG_1);
        });
    });

    describe("deletePartAndSelectOther", () => {
        // TODO
    });

});
