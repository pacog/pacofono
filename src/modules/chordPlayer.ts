import { IChord } from "types";
import { create } from "modules/polySynth";

let isPlaying = false;
const synth = create({ voices: 20 });

export const playChord = (chord: IChord, velocity: number): void => {
    isPlaying = true;
    synth.setVolume(velocity);
    synth.startPlayingChord(chord, 1);
};

export const changeVolume = (newVolume: number): void => {
    if (isPlaying) {
        synth.setVolume(newVolume);
    }
};

export const stopPlaying = (): void => {
    synth.stopPlaying();
    isPlaying = false;
};
