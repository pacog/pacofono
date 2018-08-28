import { actionCreators } from "store/actions/mainOptions";
import { rootReducer } from "store/reducers/root";
import { isSynthDebuggerShown } from "store/selectors/mainOptions";

describe("mainOptions store selectors", () => {

    it("should be able to get isSynthDebuggerShown", () => {
        const state = rootReducer({}, { type: null });
        expect(isSynthDebuggerShown(state)).toBe(false);
        const newState = rootReducer(state, actionCreators.setShowSynthDebugger(true));
        expect(isSynthDebuggerShown(newState)).toBe(true);
    });

});
