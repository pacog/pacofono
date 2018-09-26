import defaultSound from "constants/defaultSound";
import { SynthTypes } from "../../types";

import {
    CHANGE_SYNTH_TYPE,
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
});
