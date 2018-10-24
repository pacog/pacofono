import { SynthTypes, ISound } from "types";

export const CHANGE_SYNTH_TYPE = "CHANGE_SYNTH_TYPE";
export const CHANGE_SYNTH_PARAM = "CHANGE_SYNTH_PARAM";

export interface ISoundsActions {
    CHANGE_SYNTH_TYPE: {
        type: typeof CHANGE_SYNTH_TYPE,
        sound: ISound,
        newType: SynthTypes,
    };
    CHANGE_SYNTH_PARAM: {
        type: typeof CHANGE_SYNTH_PARAM,
        sound: ISound,
        paramName: string,
        newValue: any,
    };
}

export const actionCreators = {
    changeSynthType: (sound: ISound, newType: SynthTypes): ISoundsActions[typeof CHANGE_SYNTH_TYPE] => ({
        type: CHANGE_SYNTH_TYPE,
        sound,
        newType,
    }),
    changeSynthParam: (sound: ISound, paramName: string, newValue: any): ISoundsActions[typeof CHANGE_SYNTH_PARAM] => ({
        type: CHANGE_SYNTH_PARAM,
        sound,
        paramName,
        newValue,
    }),
};
