import {
    IAMSynthParams,
    IFMSynthParams,
    IDuoSynthParams,
    IMonoSynthParams,
    ISimpleSynthParams,
    WaveTypes,
    FilterTypes,
    ControllerParams,
} from "types/index";
import DEFAULT_CONTROL_POINTS from "./defaultInputTransformControlPoints";

export const defaultAMSynth: IAMSynthParams = {
    harmonicity : 3,
    type: WaveTypes.Sine,
    envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 1,
        release: 0.5,
    },
    modulationType: WaveTypes.Square,
    modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5,
    },
};

export const defaultFMSynth: IFMSynthParams = {
    harmonicity: {
        defaultValue: 3,
        controllerParam: ControllerParams.none,
        inputTransformControlPoints: DEFAULT_CONTROL_POINTS,
    },
    modulationIndex: 10,
    type: WaveTypes.Sine,
    envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 1,
        release: 0.5,
    },
    modulationType: WaveTypes.Square,
    modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5,
    },
};

export const defaultDuoSynth: IDuoSynthParams = {
    vibratoAmount: 0.5,
    vibratoRate: 5,
    harmonicity: 1.5,
    voice0: {
        volume: -10,
        portamento: 0,
        type:  WaveTypes.Sine,
        filterEnvelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        },
        envelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        },
    },
    voice1: {
        volume: -10,
        portamento: 0,
        type:  WaveTypes.Sine,
        filterEnvelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        },
        envelope: {
            attack: 0.01,
            decay: 0,
            sustain: 1,
            release: 0.5,
        },
    },
};

export const defaultMonoSynth: IMonoSynthParams = {
    type:  WaveTypes.Square,
    filter: {
        Q: 6,
        frequency: 350,
        gain: 0,
        type: FilterTypes.Lowpass,
        rolloff: -24,
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.9,
        release: 1,
    },
    filterEnvelope: {
        attack: 0.06,
        decay: 0.2,
        sustain: 0.5,
        release: 2,
        baseFrequency: 200,
        octaves: 7,
        exponent: 2,
    },
};

export const defaultSimpleSynth: ISimpleSynthParams = {
    type:  WaveTypes.Triangle,
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
    },
};
