export interface INote {
    name: string;
    frequency: number;
    sharp?: boolean;
}

export interface IChord {
    name: string;
    id: string;
    notes: string[];
}

export interface ISongPart {
    name: string;
    id: string;
    chords: string[];
}

export interface ISong {
    name: string;
    id: string;
    parts: string[];
}

export interface IPoint {
    x: number;
    y: number;
}

export interface IPointRatio {
    x: number;
    y: number;
}

export interface INoteWithWeight {
    frequency: number;
    weight: number;
}

export enum SynthTypes {
    Synth = "Synth",
    AMSynth = "AmSynth",
    FMSynth = "FMSynth",
    MonoSynth = "MonoSynth",
    DuoSynth = "DuoSynth",
}

export interface ISound {
    id: string;
    name: string;
    synthType: SynthTypes;
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
    phase: number;
    harmonicity: number;
}

export interface IFMSynthParams {
    envelope: IEnvelope;
    type: WaveTypes;
    modulationType: WaveTypes;
    modulationEnvelope: IEnvelope;
    modulationIndex: number;
    harmonicity: number;
}

export interface ISynthVoiceParams {
    volume: number;
    portamento: number;
    type: WaveTypes;
    filterEnvelope: IEnvelope;
    envelope: IEnvelope;
}

export interface IDuoSynthParams {
    vibratoAmmount: number;
    vibratoRate: number;
    harmonicity: number;
    voice0: ISynthVoiceParams;
    voice1: ISynthVoiceParams;
}

export enum FilterType {
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
    type: FilterType;
    rolloff: number;
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

export interface ISimpleSynthParams {
    type: WaveTypes;
    envelope: IEnvelope;
}

export type SynthParams = IAMSynthParams | IFMSynthParams | IDuoSynthParams | IMonoSynthParams | ISimpleSynthParams;
