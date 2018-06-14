import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
//
import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as partsActions } from "store/actions/parts";
import { actionCreators as songsActions } from "store/actions/songs";
import { saveSongBeingEdited } from "store/actions/songEditor";

const originalSong1 = {
    id: "originalSong1",
    name: "Song 1",
    parts: ["originalPart1"],
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

describe("songEditor store async actions", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    describe("saveSongBeingEdited", () => {
        it("should work when editing", async () => {
            expect.assertions(2);
            const store = mockStore({
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
            });
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
            const store = mockStore({
                songs: {
                    song1,
                },
                parts: {
                    part1,
                },
                songEditor: {
                    isNewSong: true,
                    songId: song1.id,
                    originalSongId: null,
                    isShowingConfirmRestoreDefaults: false,
                    isShowingConfirmDeleteSong: false,
                    selectedPartId: "part1",
                },
            });
            const savedSong = await store.dispatch(saveSongBeingEdited() as any);

            expect(savedSong).toEqual(song1);
            expect(store.getActions()).toEqual([
                songEditorActions.stopEditing(),
            ]);
        });
    });

    // TODO: test other async actions
});
