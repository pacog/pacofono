import { actionCreators } from "store/actions/leapMotionState";
import { leapMotionStateReducer } from "store/reducers/leapMotionState";
import { rootReducer } from "store/reducers/root";

describe("leapMotionState store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.leapMotionState).toEqual({
            isConnected: false,
            isFocused: false,
        });
    });

    it("should process changing connected", () => {
        const rootState = rootReducer({}, { type: null });
        let state = leapMotionStateReducer(rootState.leapMotionState, actionCreators.setConnected(true));
        expect(state)
            .toEqual({
                isConnected: true,
                isFocused: false,
            });
        state = leapMotionStateReducer(state, actionCreators.setConnected(false));
        expect(state)
            .toEqual({
                isConnected: false,
                isFocused: false,
            });
    });

    it("should process changing focused", () => {
        const rootState = rootReducer({}, { type: null });
        let state = leapMotionStateReducer(rootState.leapMotionState, actionCreators.setFocused(true));
        expect(state)
            .toEqual({
                isConnected: false,
                isFocused: true,
            });
        state = leapMotionStateReducer(state, actionCreators.setFocused(false));
        expect(state)
            .toEqual({
                isConnected: false,
                isFocused: false,
            });
    });
});
