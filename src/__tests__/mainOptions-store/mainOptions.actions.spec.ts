import {
    SET_SHOW_SYNTH_DEBUGGER,
    SET_SHOW_AUDIO_OUPUT,
    actionCreators,
} from "store/actions/mainOptions";

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

    it("should have a setShowAudioOutput action", () => {
        expect(actionCreators.setShowAudioOutput(true))
            .toEqual({
                type: SET_SHOW_AUDIO_OUPUT,
                show: true,
            });

        expect(actionCreators.setShowAudioOutput(false))
            .toEqual({
                type: SET_SHOW_AUDIO_OUPUT,
                show: false,
            });
    });
});
