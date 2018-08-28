import { SET_SHOW_SYNTH_DEBUGGER, actionCreators } from "store/actions/mainOptions";

describe("mainOptions actions", () => {
    it("should have a setShowSynthDebugger action", () => {
        expect(actionCreators.setShowSynthDebugger(true))
            .toEqual({
                type: SET_SHOW_SYNTH_DEBUGGER,
                show: true,
            });

        expect(actionCreators.setShowSynthDebugger(false))
            .toEqual({
                type: SET_SHOW_SYNTH_DEBUGGER,
                show: false,
            });
    });
});
