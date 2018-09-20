import { SynthTypes, ISound } from "types";

export const CHANGE_SYNTH_TYPE = "CHANGE_SYNTH_TYPE";

export interface ISoundsActions {
    CHANGE_SYNTH_TYPE: {
        type: typeof CHANGE_SYNTH_TYPE,
        sound: ISound,
        newType: SynthTypes,
    };
}

export const actionCreators = {
    changeSynthType: (sound: ISound, newType: SynthTypes): ISoundsActions[typeof CHANGE_SYNTH_TYPE] => ({
        type: CHANGE_SYNTH_TYPE,
        sound,
        newType,
    }),
};
