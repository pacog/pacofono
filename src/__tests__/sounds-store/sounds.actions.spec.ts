import defaultSound from "constants/defaultSound";
import { SynthTypes } from "../../types";

import {
    CHANGE_SYNTH_TYPE,
    CHANGE_SYNTH_PARAM,
    actionCreators,
} from "store/actions/sounds";

describe("sounds store actions", () => {
    it("should have a change synth type action", () => {
        expect(actionCreators.changeSynthType(defaultSound, SynthTypes.MonoSynth))
            .toEqual({
                type: CHANGE_SYNTH_TYPE,
                sound: defaultSound,
                newType: SynthTypes.MonoSynth,
            });
    });

    it("should have a change synth param action", () => {
        const newValue = {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 1,
        };
        expect(actionCreators.changeSynthParam(defaultSound, "envelope", { ... newValue }))
            .toEqual({
                type: CHANGE_SYNTH_PARAM,
                sound: defaultSound,
                paramName: "envelope",
                newValue,
            });

        expect(actionCreators.changeSynthParam(defaultSound, "type", SynthTypes.DuoSynth))
            .toEqual({
                type: CHANGE_SYNTH_PARAM,
                sound: defaultSound,
                paramName: "type",
                newValue: SynthTypes.DuoSynth,
            });

        expect(actionCreators.changeSynthParam(defaultSound, "vibratoRate", 3))
            .toEqual({
                type: CHANGE_SYNTH_PARAM,
                sound: defaultSound,
                paramName: "vibratoRate",
                newValue: 3,
            });
    });
});
