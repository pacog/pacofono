import { actionCreators } from "store/actions/currentSong";
import { currentSongReducer } from "store/reducers/currentSong";
import { rootReducer } from "store/reducers/root";

describe("currentSong store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.currentSong).toEqual({
            id: null,
        });
    });

    it("should process changing values", () => {
        const song = {
            id: "67",
            name: "Música rancia",
            parts: ["partId"],
        };
        const state = rootReducer({}, { type: null });
        const stateAfter = currentSongReducer(state.currentSong, actionCreators.setCurrentSong(song));
        expect(stateAfter)
            .toEqual({
                id: "67",
            });
        const stateAfter2 = currentSongReducer(stateAfter, actionCreators.setCurrentSong(null));
        expect(stateAfter2)
            .toEqual({
                id: null,
            });
    });
});
