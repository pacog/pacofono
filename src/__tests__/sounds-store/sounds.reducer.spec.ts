import { actionCreators } from "store/actions/sounds";
import { rootReducer } from "store/reducers/root";
import { soundsReducer } from "store/reducers/sounds";
import defaultSound from "constants/defaultSound";
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
            actionCreators.changeSynthType(defaultSound, SynthTypes.MonoSynth),
        );
        expect(stateAfter[defaultSound.id]).toEqual(Object.assign({},
            defaultSound,
            { synthType: SynthTypes.MonoSynth },
        ));
    });

});
