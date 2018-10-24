import { actionCreators } from "store/actions/sounds";
import { rootReducer } from "store/reducers/root";
import { soundsReducer } from "store/reducers/sounds";
import defaultSound from "constants/defaultSound";
import { defaultDuoSynth, defaultAMSynth } from "constants/defaultSynthParams";
import { SynthTypes } from "../../types";

describe("Sounds store ", () => {

    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.sounds).toEqual({
            [defaultSound.id]: defaultSound,
        });
    });

    it("should be able to change synth type", () => {
        const initialState = rootReducer({}, { type: null });
        const stateAfter = soundsReducer(
            initialState.sounds,
            actionCreators.changeSynthType(defaultSound, SynthTypes.DuoSynth),
        );
        expect(stateAfter[defaultSound.id]).toEqual({
            ...defaultSound,
            synthType: SynthTypes.DuoSynth,
            params: defaultDuoSynth,
        });

        const stateAfter2 = soundsReducer(
            stateAfter,
            actionCreators.changeSynthType(stateAfter[defaultSound.id], SynthTypes.AMSynth),
        );
        expect(stateAfter2[defaultSound.id]).toEqual({
            ...stateAfter[defaultSound.id],
            synthType: SynthTypes.AMSynth,
            params: defaultAMSynth,
        });
    });

});
