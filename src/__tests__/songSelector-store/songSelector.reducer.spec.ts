import { actionCreators } from "store/actions/songSelector";
import { songSelectorReducer } from "store/reducers/songSelector";
import { rootReducer } from "store/reducers/root";

describe("songSelector store reducer", () => {
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
