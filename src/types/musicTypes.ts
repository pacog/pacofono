export interface INote {
    name: string;
    frequency: number;
    sharp?: boolean;
}

export interface INoteWithWeight {
    frequency: number;
    weight: number;
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
