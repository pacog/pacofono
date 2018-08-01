import { IChord } from "types";

import { create } from "modules/polySynth";

// import { PolySynth, FMSynth } from "tone";

// const VOICES = 20;
// const synth = new PolySynth(VOICES, FMSynth).toMaster();
let isPlaying = false;
const synth = create({ voices: 20 });

export const playChord = (chord: IChord, velocity: number): void => {
    isPlaying = true;
    synth.playChord(chord);
    // synth.set("volume", volumeToDecibels(velocity));
    // synth.triggerAttack(chord.notes, undefined, velocity);
};

export const changeVolume = (newVolume: number): void => {
    if (isPlaying) {
        // synth.set("volume", volumeToDecibels(newVolume));
    }
};

export const stopPlaying = (): void => {
    // synth.releaseAll();
    isPlaying = false;
};

// function volumeToDecibels(volume: number): number {
//     const MAX_DECIBELS = 0;
//     const MIN_DECIBELS = -60;
//     return MIN_DECIBELS + (volume * (MAX_DECIBELS - MIN_DECIBELS));
// }
