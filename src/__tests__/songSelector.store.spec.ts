// import { SET_CURRENT_SONG, actionCreators } from "store/actions/currentSong";
import { OPEN_SONG_SELECTOR, CLOSE_SONG_SELECTOR, actionCreators } from "store/actions/songSelector";
import { songSelectorReducer } from "store/reducers/songSelector";
import { rootReducer } from "store/reducers/root";
import { isOpen } from "store/selectors/songSelector";

describe("songSelector store", () => {

    describe("actions", () => {
        it("should have a open songSelector action", () => {
            expect(actionCreators.open())
                .toEqual({
                    type: OPEN_SONG_SELECTOR,
                });
        });

        it("should have a close songSelector action", () => {
            expect(actionCreators.close())
                .toEqual({
                    type: CLOSE_SONG_SELECTOR,
                });
        });
    });

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.songSelector).toEqual({
                isOpen: false,
            });
        });
        //
        it("should process opening and closing", () => {
            const state = rootReducer({}, { type: null });
            const stateAfter = songSelectorReducer(state.songSelector, actionCreators.open());
            expect(stateAfter)
                .toEqual({
                    isOpen: true,
                });
            const stateAfter2 = songSelectorReducer(stateAfter, actionCreators.close());
            expect(stateAfter2)
                .toEqual({
                    isOpen: false,
                });
        });
    });

    describe("selectors", () => {
        it("should be able to get isOpen value", () => {
            const state = rootReducer({}, { type: null });
            expect(isOpen(state)).toBe(true); // shown since there is no selected song

            const newState = rootReducer(state, actionCreators.open());
            expect(isOpen(newState)).toBe(true);

            const newState2 = rootReducer(newState, actionCreators.close());
            expect(isOpen(newState2)).toBe(true); // shown since there is no selected song
        });
    });
});
