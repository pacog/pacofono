import { actionCreators } from "store/actions/mainOptions";
import { mainOptionsReducer } from "store/reducers/mainOptions";
import { rootReducer } from "store/reducers/root";

describe("mainOptions store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.mainOptions).toEqual({
            showSynthDebugger: false,
        });
    });

    it("should process changing mute", () => {
        const state = rootReducer({}, { type: null });
        const stateAfter = mainOptionsReducer(state.mainOptions, actionCreators.setShowSynthDebugger(true));
        expect(stateAfter)
            .toEqual({
                showSynthDebugger: true,
            });
        const stateAfter2 = mainOptionsReducer(stateAfter, actionCreators.setShowSynthDebugger(false));
        expect(stateAfter2)
            .toEqual({
                showSynthDebugger: false,
            });
    });
});
