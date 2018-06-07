import { actionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { getSong } from "store/selectors/songs";

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
});

// TODO test getSavedSongs
