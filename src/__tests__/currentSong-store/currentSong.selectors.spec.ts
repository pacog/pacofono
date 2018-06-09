import { actionCreators } from "store/actions/currentSong";
import { actionCreators as songsActions } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { getCurrentSong, isCurrentSong } from "store/selectors/currentSong";

describe("currentSong store", () => {

    describe("selectors", () => {
        it("should be able to get the current song", () => {
            const song = {
                id: "69",
                name: "Medusas",
                parts: ["partId"],
            };
            const state = rootReducer({}, { type: null });
            expect(getCurrentSong(state)).toBe(null);
            expect(isCurrentSong(state, song)).toBe(false);
            const newState = rootReducer(state, songsActions.addSong(song));
            const newState2 = rootReducer(newState, actionCreators.setCurrentSong(song));
            expect(getCurrentSong(newState2)).toEqual(song);
            expect(isCurrentSong(newState2, song)).toBe(true);
        });
    });
});
