import createEmptyStore from "test-helpers/createEmptyStore";
import { getMockStore, data as mockData } from "test-helpers/mockStoreData";
import {
    saveSongBeingEdited,
    openForNewSong,
    openForExistingSong,
    restoreDefaults,
    deleteSongBeingEdited,
    deletePartAndSelectOther,
    deleteChordAndSelectOther,
    addChordToPartBeingEdited,
    saveEditedSongAsCopy,
    duplicateAndEditPart,
    duplicateAndEditChord,
    actionCreators as songEditorActions,
} from "store/actions/songEditor";
import { actionCreators as songActions} from "store/actions/songs";

import {
    getSong,
    getOriginalSong,
    getPartBeingEdited,
    getChordBeingEdited,
    getChordsFromPartBeingEdited,
} from "store/selectors/songEditor";
import { isSongEditorModalOpen } from "store/selectors/modals";
import { getSong as getSongById } from "store/selectors/songs";
import { getPartById } from "store/selectors/parts";
import { getChordById } from "store/selectors/chords";

jest.mock("uuid", () => {
    let num = 1;
    return {
        v1: jest.fn(() => "uuid_" + (num++).toString()),
    };
});

describe("songEditor store async actions", () => {

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

    describe("saveSongBeingEdited", () => {

        it("should work when editing a song (so remove the original one)", async () => {
            expect.assertions(3);
            const store = createEmptyStore(getMockStore());
            await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            const savedSong = await store.dispatch(saveSongBeingEdited() as any);
            const state = store.getState();
            expect(isSongEditorModalOpen(state)).toBe(false);
            expect(getSongById(state, mockData.SONG_1.id)).toBe(undefined);
            expect(getSongById(state, savedSong.id)).toEqual(savedSong);
        });

        it("should work when adding a song", async () => {
            expect.assertions(2);
            const store = createEmptyStore();
            await store.dispatch(openForNewSong() as any);
            const savedSong = await store.dispatch(saveSongBeingEdited() as any);
            const state = store.getState();
            expect(isSongEditorModalOpen(state)).toBe(false);
            expect(getSongById(state, savedSong.id)).toEqual(savedSong);
        });
    });

    describe("restoreDefaults", () => {
        it("should be able to restore defaults", async () => {
            expect.assertions(4);
            const store = createEmptyStore(getMockStore());
            const songBeingEdited = await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            expect(getSongById(store.getState(), songBeingEdited.id)).toEqual(songBeingEdited);
            store.dispatch(songActions.changeSongName(songBeingEdited, "new name"));
            expect(getSong(store.getState()).name).toBe("new name");
            await store.dispatch(restoreDefaults() as any);
            const newSongBeingEdited = getSong(store.getState());
            expect(newSongBeingEdited).not.toEqual(songBeingEdited);
            expect(newSongBeingEdited.name).not.toBe("new name");
        });
    });

    describe("deleteSongBeingEdited", () => {
        it("should do nothing if song is being added, not edited", async () => {
            expect.assertions(1);
            const store = createEmptyStore();
            await store.dispatch(openForNewSong() as any);
            const state1 = store.getState();
            await store.dispatch(deleteSongBeingEdited() as any);
            const state2 = store.getState();
            expect(state1).toEqual(state2);
        });

        it("should delete the song if it is being edited", async () => {
            expect.assertions(4);
            const store = createEmptyStore(getMockStore());
            const songBeingEdited = await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            expect(getSong(store.getState())).toEqual(songBeingEdited);
            expect(getSongById(store.getState(), songBeingEdited.id)).toEqual(songBeingEdited);
            await store.dispatch(deleteSongBeingEdited() as any);
            expect(getSongById(store.getState(), songBeingEdited.id)).toBe(undefined);
            expect(getSong(store.getState())).toBe(undefined);
        });

    });

    describe("deletePartAndSelectOther", () => {
        it("should delete a part and select other", async () => {
            expect.assertions(5);
            const store = createEmptyStore(getMockStore());
            const songBeingEdited = await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            expect(getSongById(store.getState(), songBeingEdited.id).parts.length).toBe(2);
            expect(getPartBeingEdited(store.getState()))
                .toEqual(getPartById(store.getState(), songBeingEdited.parts[0]));

            const partToDelete = getPartById(store.getState(), songBeingEdited.parts[1]);
            store.dispatch(songEditorActions.selectSongPartToEdit(partToDelete.id));
            expect(getPartBeingEdited(store.getState()))
                .toEqual(partToDelete);

            await store.dispatch(deletePartAndSelectOther(partToDelete, songBeingEdited) as any);
            const newSongBeingEdited = getSong(store.getState());
            expect(newSongBeingEdited.parts.length).toBe(1);
            expect(getPartBeingEdited(store.getState()))
                .toEqual(getPartById(store.getState(), newSongBeingEdited.parts[0]));
        });
    });

    describe("deleteChordAndSelectOther", () => {
        it("should delete a chord and select other", async () => {
            expect.assertions(5);
            const store = createEmptyStore(getMockStore());
            await store.dispatch(openForExistingSong(mockData.SONG_2) as any);
            const partBeingEdited = getPartBeingEdited(store.getState());
            expect(partBeingEdited.chords.length).toBe(2);
            expect(getChordBeingEdited(store.getState()))
                .toEqual(getChordById(store.getState(), partBeingEdited.chords[0]));

            const chordToDelete = getChordById(store.getState(), partBeingEdited.chords[1]);
            store.dispatch(songEditorActions.selectChordToEdit(chordToDelete.id));
            expect(getChordBeingEdited(store.getState()))
                .toEqual(getChordById(store.getState(), chordToDelete.id));

            await store.dispatch(deleteChordAndSelectOther(chordToDelete, partBeingEdited.id) as any);
            const newPartBeingEdited = getPartBeingEdited(store.getState());
            expect(newPartBeingEdited.chords.length).toBe(1);
            expect(getChordBeingEdited(store.getState()))
                .toEqual(getChordById(store.getState(), newPartBeingEdited.chords[0]));
        });
    });

    describe("addChordToPartBeingEdited", () => {
        it("should be able to add a chord", async () => {
            expect.assertions(3);
            const store = createEmptyStore(getMockStore());
            await store.dispatch(openForExistingSong(mockData.SONG_2) as any);
            const partBeingEdited = getPartBeingEdited(store.getState());
            expect(partBeingEdited.chords.length).toBe(2);

            await store.dispatch(addChordToPartBeingEdited() as any);

            const newPartBeingEdited = getPartBeingEdited(store.getState());
            expect(newPartBeingEdited.chords).toEqual(["uuid_46", "uuid_47", "uuid_48"]);
            const expectedNewChord = {
                id: "uuid_48",
                name: "New chord",
                notes: ([] as string[]),
            };
            expect(getChordById(store.getState(), "uuid_48")).toEqual(expectedNewChord);
        });
    });

    describe("saveEditedSongAsCopy", () => {
        it("should be able to save the edited song as a copy and start editing it", async () => {
            expect.assertions(5);
            const store = createEmptyStore(getMockStore());
            await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            const firstSongBeingEdited = getSong(store.getState());
            const songCopy = await store.dispatch(saveEditedSongAsCopy() as any);
            const newSongBeingEdited = getSong(store.getState());
            const expectedSong = {
                id: "uuid_59",
                name: mockData.SONG_1.name,
                parts: ["uuid_60", "uuid_62"],
            };
            expect(songCopy).toEqual(expectedSong);
            expect(songCopy).toEqual(newSongBeingEdited);
            const state = store.getState();
            expect(getSongById(state, firstSongBeingEdited.id)).toBe(undefined);
            expect(getPartBeingEdited(state)).toEqual(getPartById(state, "uuid_60"));
            expect(getChordBeingEdited(state)).toEqual(getChordById(state, "uuid_61"));
        });
    });

    describe("duplicateAndEditPart", () => {
        it("should be able to duplicate a part", async () => {
            expect.assertions(3);
            const store = createEmptyStore(getMockStore());
            await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            const song = getSong(store.getState());
            const partToCopy = getPartBeingEdited(store.getState());
            const copiedPart = await store.dispatch(duplicateAndEditPart(partToCopy, song) as any);
            const expectedPart = {
                id: "uuid_69",
                name: `${partToCopy.name} (copy)`,
                chords: ["uuid_70"],
            };
            expect(copiedPart).toEqual(expectedPart);
            const state = store.getState();
            expect(getPartBeingEdited(state)).toEqual(copiedPart);
            expect(getChordBeingEdited(state)).toEqual(getChordById(state, copiedPart.chords[0]));
        });
    });

    describe("duplicateAndEditChord", () => {
        it("should be able to duplicate a chord", async () => {
            expect.assertions(2);
            const store = createEmptyStore(getMockStore());
            await store.dispatch(openForExistingSong(mockData.SONG_1) as any);
            const part = getPartBeingEdited(store.getState());
            const chordToCopy = getChordBeingEdited(store.getState());
            const copiedChord = await store.dispatch(duplicateAndEditChord(chordToCopy, part) as any);
            const expectedChord = {
                id: "uuid_76",
                name: `${chordToCopy.name}`,
                notes: chordToCopy.notes.slice(),
            };
            expect(copiedChord).toEqual(expectedChord);
            const state = store.getState();
            expect(getChordBeingEdited(state)).toEqual(copiedChord);
        });
    });

});
