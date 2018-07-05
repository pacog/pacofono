import { actionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { getSong, getSavedSongs } from "store/selectors/songs";
import createEmptyStore from "test-helpers/createEmptyStore";
import { getMockStore, data as mockData } from "test-helpers/mockStoreData";

describe("Song store selectors", () => {

    describe("getSong selector", () => {
        it("should work after starting to edit a song", () => {
            const songToAdd = {
                id: "id1",
                name: "myNewSong",
                parts: ["partId"],
            };
            const state = rootReducer({}, { type: null });
            expect(getSong(state, "id1")).toBe(undefined);

            const newState = rootReducer(state, actionCreators.addSong(songToAdd));
            expect(getSong(newState, "id1")).toEqual(songToAdd);
        });
    });

    describe("getSavedSongs selector", () => {
        it("should return [] when no songs", () => {
            const store = createEmptyStore();
            const state = store.getState();
            expect(getSavedSongs(state)).toEqual([]);
        });

        it("should return songs when there are songs", () => {
            const store = createEmptyStore(getMockStore());
            const state = store.getState();
            expect(getSavedSongs(state)).toEqual([
                mockData.SONG_1,
                mockData.SONG_2,
            ]);
        });
    });

});
