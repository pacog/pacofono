import { actionCreators } from "store/actions/leapMotionState";
import { rootReducer } from "store/reducers/root";
import { isFocused, isConnected } from "store/selectors/leapMotionState";

describe("leapMotionState store selectors", () => {
    it("should be able to get info about connected and focused", () => {
        const state = rootReducer({}, { type: null });
        expect(isFocused(state)).toBe(false);
        expect(isConnected(state)).toBe(false);
        const newState = rootReducer(state, actionCreators.setFocused(true));
        expect(isFocused(newState)).toBe(true);
        expect(isConnected(newState)).toBe(false);
        const newState2 = rootReducer(newState, actionCreators.setConnected(true));
        expect(isFocused(newState2)).toBe(true);
        expect(isConnected(newState2)).toBe(true);
    });

});
