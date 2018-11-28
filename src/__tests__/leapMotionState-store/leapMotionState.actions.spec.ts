import { SET_CONNECTED, SET_FOCUSED, actionCreators } from "store/actions/leapMotionState";

describe("leapMotionState actions", () => {
    it("should have a setConnected action", () => {
        expect(actionCreators.setConnected(true))
            .toEqual({
                type: SET_CONNECTED,
                connected: true,
            });
        expect(actionCreators.setConnected(false))
            .toEqual({
                type: SET_CONNECTED,
                connected: false,
            });
    });

    it("should have a setFocused action", () => {
        expect(actionCreators.setFocused(true))
            .toEqual({
                type: SET_FOCUSED,
                focused: true,
            });

        expect(actionCreators.setFocused(false))
            .toEqual({
                type: SET_FOCUSED,
                focused: false,
            });
    });
});
