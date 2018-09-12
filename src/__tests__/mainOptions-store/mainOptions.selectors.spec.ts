import { actionCreators } from "store/actions/mainOptions";
import { rootReducer } from "store/reducers/root";
import {
    isSynthDebuggerShown,
    isAudioOutputShown,
} from "store/selectors/mainOptions";

describe("mainOptions store selectors", () => {

    it("should be able to get isSynthDebuggerShown", () => {
        const state = rootReducer({}, { type: null });
        expect(isSynthDebuggerShown(state)).toBe(false);
        const newState = rootReducer(state, actionCreators.setShowSynthDebugger(true));
        expect(isSynthDebuggerShown(newState)).toBe(true);
    });

    it("should be able to get isAudioOutputShown", () => {
        const state = rootReducer({}, { type: null });
        expect(isAudioOutputShown(state)).toBe(false);
        const newState = rootReducer(state, actionCreators.setShowAudioOutput(true));
        expect(isAudioOutputShown(newState)).toBe(true);
    });

});
