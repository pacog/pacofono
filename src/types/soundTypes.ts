import { IControllableParam } from "./controllerTypes";

export enum SynthTypes {
    Synth = "Synth",
    AMSynth = "AmSynth",
    FMSynth = "FMSynth",
    MonoSynth = "MonoSynth",
    DuoSynth = "DuoSynth",
}

export enum WaveTypes {
    Triangle = "triangle",
    Square = "square",
    Sine = "sine",
    Sawtooth = "sawtooth",
}

export interface IEnvelope {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

export interface IAMSynthParams {
    envelope: IEnvelope;
    type: WaveTypes;
    modulationType: WaveTypes;
    modulationEnvelope: IEnvelope;
    harmonicity: number;
}

export interface IRawAMSynthParams {
    envelope?: IEnvelope;
    type?: WaveTypes;
    modulationType?: WaveTypes;
    modulationEnvelope?: IEnvelope;
    harmonicity?: number;
}

export interface IFMSynthParams {
    envelope: IEnvelope;
    type: WaveTypes;
    modulationType: WaveTypes;
    modulationEnvelope: IEnvelope;
    modulationIndex: number;
    harmonicity: IControllableParam;
}

export interface IRawFMSynthParams {
    envelope?: IEnvelope;
    type?: WaveTypes;
    modulationType?: WaveTypes;
    modulationEnvelope?: IEnvelope;
    modulationIndex?: number;
    harmonicity?: number;
}

export interface ISynthVoiceParams {
    volume: number;
    portamento: number;
    type: WaveTypes;
    filterEnvelope: IEnvelope;
    envelope: IEnvelope;
}

export interface IDuoSynthParams {
    vibratoAmount: IControllableParam;
    vibratoRate: IControllableParam;
    harmonicity: IControllableParam;
    voice0: ISynthVoiceParams;
    voice1: ISynthVoiceParams;
}

export interface IRawDuoSynthParams {
    vibratoAmount?: number;
    vibratoRate?: number;
    harmonicity?: number;
    voice0?: ISynthVoiceParams;
    voice1?: ISynthVoiceParams;
}

export enum FilterTypes {
    Lowpass = "lowpass",
    Highpass = "highpass",
    Bandpass = "bandpass",
    Lowshelf = "lowshelf",
    Highshelf = "highshelf",
    Notch = "notch",
    Allpass = "allpass",
    Peaking = "peaking",
}

export interface IFilter {
    Q: number;
    type: FilterTypes;
    rolloff: number;
    gain: number;
    frequency: number;
}

export interface IFilterEnvelope {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    baseFrequency: number;
    octaves: number;
    exponent: number;
}

export interface IMonoSynthParams {
    type: WaveTypes;
    filter: IFilter;
    filterEnvelope: IFilterEnvelope;
    envelope: IEnvelope;
}

export interface IRawMonoSynthParams {
    type?: WaveTypes;
    filter?: IFilter;
    filterEnvelope?: IFilterEnvelope;
    envelope?: IEnvelope;
}

export interface ISimpleSynthParams {
    type: WaveTypes;
    envelope: IEnvelope;
}

export interface IRawSimpleSynthParams {
    type?: WaveTypes;
    envelope?: IEnvelope;
}

export type SynthParams = IAMSynthParams | IFMSynthParams | IDuoSynthParams | IMonoSynthParams | ISimpleSynthParams;
export type RawSynthParams = IRawAMSynthParams | IRawFMSynthParams | IRawDuoSynthParams |
    IRawMonoSynthParams | IRawSimpleSynthParams;

export interface ISound {
    id: string;
    name: string;
    synthType: SynthTypes;
    params: SynthParams;
}


