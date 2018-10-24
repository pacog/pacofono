import { RootAction } from "store/actions";
import { CHANGE_SYNTH_TYPE, CHANGE_SYNTH_PARAM } from "store/actions/sounds";
import { ISound, SynthTypes, SynthParams } from "types/index";
import defaultSound from "constants/defaultSound";
import {
    defaultAMSynth,
    defaultDuoSynth,
    defaultFMSynth,
    defaultMonoSynth,
    defaultSimpleSynth,
} from "constants/defaultSynthParams";

export interface ISoundsState {
    readonly [id: string]: ISound;
}

const initialState: ISoundsState = {
    [defaultSound.id]: defaultSound,
};

export const soundsReducer = (state: ISoundsState = initialState, action: RootAction) => {
    switch (action.type) {
        case CHANGE_SYNTH_TYPE:
            return {
                ...state,
                [action.sound.id]: {
                    ...state[action.sound.id],
                    synthType: action.newType,
                    params: getDefaultParamsForSynthType(action.newType),
                },
            };
        case CHANGE_SYNTH_PARAM:
            const prevSound = state[action.sound.id];
            let newValue = action.newValue;
            if (typeof action.newValue === "object") {
                newValue = { ...action.newValue };
            }
            return {
                ...state,
                [action.sound.id]: {
                    ...prevSound,
                    params: {
                        ...prevSound.params,
                        [action.paramName]: newValue,
                    },
                },
            };
        default:
            return state;
    }
};

function getDefaultParamsForSynthType(synthType: SynthTypes): SynthParams {
    switch (synthType) {
        case SynthTypes.AMSynth:
            return defaultAMSynth;
        case SynthTypes.DuoSynth:
            return defaultDuoSynth;
        case SynthTypes.FMSynth:
            return defaultFMSynth;
        case SynthTypes.MonoSynth:
            return defaultMonoSynth;
        case SynthTypes.Synth:
            return defaultSimpleSynth;
        default:
            return null;
    }
}
