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
