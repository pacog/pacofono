import { IChord } from "types";
import { PolySynth, FMSynth } from "tone";

const VOICES = 20;
const synth = new PolySynth(VOICES, FMSynth).toMaster();

export const playChord = (chord: IChord, velocity: number): void => {
    synth.triggerAttack(chord.notes, undefined, velocity);
};

export const stopPlaying = (): void => {
    synth.releaseAll();
};
