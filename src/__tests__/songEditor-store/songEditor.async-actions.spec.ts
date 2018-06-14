import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as partsActions } from "store/actions/parts";
import { actionCreators as songsActions } from "store/actions/songs";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { saveSongBeingEdited, restoreDefaults, deleteSongBeingEdited } from "store/actions/songEditor";

jest.mock("uuid", () => {
    let num = 1;
    return {
        v1: jest.fn(() => "uuid_" + (num++).toString()),
    };
});

const originalSong1 = {
    id: "originalSong1",
    name: "Song 1",
    parts: ["originalPart1"],
};

const otherSong = {
    id: "otherSong",
    name: "otherSong",
    parts: ["otherPart"],
};

const song1 = {
    id: "song1",
    name: "Song 1",
    parts: ["part1"],
};

const part1 = {
    id: "part1",
    name: "Part 1",
    chords: ["chord1"],
};
const originalPart1 = {
    id: "originalPart1",
    name: "Part 1",
    chords: ["chord1"],
};

const stateWhenEditing = {
    songs: {
        song1,
        originalSong1,
    },
    parts: {
        part1,
        originalPart1,
    },
    songEditor: {
        isNewSong: false,
        songId: song1.id,
        originalSongId: originalSong1.id,
        isShowingConfirmRestoreDefaults: false,
        isShowingConfirmDeleteSong: false,
        selectedPartId: "part1",
    },
};

const stateWhenAdding = {
    songs: {
        song1,
    },
    parts: {
        part1,
    },
    songEditor: {
        isNewSong: true,
        songId: song1.id,
        originalSongId: null as string,
        isShowingConfirmRestoreDefaults: false,
        isShowingConfirmDeleteSong: false,
        selectedPartId: "part1",
    },
};


describe("songEditor store async actions", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    describe("saveSongBeingEdited", () => {
        it("should work when editing", async () => {
            expect.assertions(2);
            const store = mockStore(stateWhenEditing);
            const savedSong = await store.dispatch(saveSongBeingEdited() as any);

            expect(savedSong).toEqual(song1);
            expect(store.getActions()).toEqual([
                partsActions.deletePart(originalPart1, originalSong1.id),
                songsActions.deleteSong(originalSong1),
                songEditorActions.stopEditing(),
            ]);
        });

        it("should work when adding song", async () => {
            expect.assertions(2);
            const store = mockStore(stateWhenAdding);
            const savedSong = await store.dispatch(saveSongBeingEdited() as any);

            expect(savedSong).toEqual(song1);
            expect(store.getActions()).toEqual([
                songEditorActions.stopEditing(),
            ]);
        });
    });

    describe("restoreDefaults", () => {
        it("should work when editing song", async () => {
            expect.assertions(1);
            const store = mockStore(stateWhenEditing);
            await store.dispatch(restoreDefaults() as any);

            expect(store.getActions()).toEqual([
                partsActions.deletePart(part1, song1.id),
                songsActions.deleteSong(song1),
                songsActions.addSong({ ...song1, id: "uuid_1", parts: [] }),
                partsActions.addPart({ ...part1, id: "uuid_2" }, "uuid_1"),
                // this undefined should be a copy of originalSong1, but mock store doesn't handle reducers
                songEditorActions.startEditingExistingSong(undefined, originalSong1),
            ]);
        });
    });

    describe("deleteSongBeingEdited", () => {
        it("should work when editing song", async () => {
            expect.assertions(1);
            const store = mockStore(stateWhenEditing);
            await store.dispatch(deleteSongBeingEdited() as any);

            expect(store.getActions()).toEqual([
                partsActions.deletePart(part1, song1.id),
                songsActions.deleteSong(song1),
                partsActions.deletePart(originalPart1, originalSong1.id),
                songsActions.deleteSong(originalSong1),
                currentSongActions.setCurrentSong(originalSong1),
                // Previous line should be the next line, but mockStore doesn't execute reducers
                // currentSongActions.setCurrentSong(otherSong),
            ]);
        });
    });


    // TODO: test other async actions: openForNewSong
});
