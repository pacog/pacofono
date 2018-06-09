import { actionCreators } from "store/actions/songSelector";
import { actionCreators as currentSongActionCreators } from "store/actions/currentSong";
import { actionCreators as songsActions } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { isOpen } from "store/selectors/songSelector";

describe("songSelector store selectors", () => {
    it("should be able to get isOpen value", () => {
        const state = rootReducer({}, { type: null });
        expect(isOpen(state)).toBe(true); // shown since there is no selected song

        const song = {
            id: "69",
            name: "Medusas",
            parts: ["partId"],
        };
        const newStatePrev = rootReducer(state, songsActions.addSong(song));
        const newState = rootReducer(newStatePrev, currentSongActionCreators.setCurrentSong(song));
        expect(isOpen(newState)).toBe(false);

        const newState2 = rootReducer(newState, actionCreators.open());
        expect(isOpen(newState2)).toBe(true);

        const newState3 = rootReducer(newState2, actionCreators.close());
        expect(isOpen(newState3)).toBe(false);
    });
});
