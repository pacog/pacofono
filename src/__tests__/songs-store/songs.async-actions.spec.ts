import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { actionCreators as songsActions } from "store/actions/songs";
import { actionCreators as partsActions } from "store/actions/parts";
import { duplicateSong, cascadeDeleteSong } from "store/actions/songs";

const TEST_PART = {
    id: "part_1",
    name: "bloch",
    chords: [""],
};

const TEST_PART_2 = {
    id: "part_2",
    name: "blach",
    chords: [""],
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

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    describe("duplicateSong", () => {
        it("should work", async () => {
            expect.assertions(1);
            const store = mockStore({
                songs: {
                    [TEST_SONG.id]: TEST_SONG,
                },
                parts: {
                    [TEST_PART.id]: TEST_PART,
                    [TEST_PART_2.id]: TEST_PART_2,
                },
            });
            await store.dispatch(duplicateSong(TEST_SONG) as any);
            const copiedSongAsItShouldBe = {
                ...TEST_SONG,
                id: "uuid_1",
                parts: ([] as string[]),
            };
            // In order to test the state is correct, we should use a mock library
            // that executes reducers on actions
            // expect(copiedSong).toEqual(copiedSongAsItShouldBe);
            expect(store.getActions()).toEqual([
                songsActions.addSong(copiedSongAsItShouldBe),
                partsActions.addPart({ ...TEST_PART, id: "uuid_2" }, copiedSongAsItShouldBe.id),
                partsActions.addPart({ ...TEST_PART_2, id: "uuid_3" }, copiedSongAsItShouldBe.id),
            ]);
        });
    });

    describe("cascadeDeleteSong", () => {
        it("should work", async () => {
            expect.assertions(2);
            const store = mockStore({
                songs: {
                    [TEST_SONG.id]: TEST_SONG,
                },
                parts: {
                    [TEST_PART.id]: TEST_PART,
                    [TEST_PART_2.id]: TEST_PART_2,
                },
            });
            const deletedSong = await store.dispatch(cascadeDeleteSong(TEST_SONG) as any);
            expect(deletedSong).toEqual(TEST_SONG);
            expect(store.getActions()).toEqual([
                partsActions.deletePart(TEST_PART, TEST_SONG.id),
                partsActions.deletePart(TEST_PART_2, TEST_SONG.id),
                songsActions.deleteSong(TEST_SONG),
            ]);
        });
    });

});
