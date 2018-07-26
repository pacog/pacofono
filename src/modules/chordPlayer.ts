import { IChord } from "types";
import { PolySynth, FMSynth } from "tone";


// a polysynth composed of 6 Voices of Synth
const synth = new PolySynth(6, FMSynth).toMaster();

export const playChord = (chord: IChord): void => {
    synth.triggerAttackRelease(chord.notes, "4n");
    // chord.notes.forEach((note, index) => {
    //     console.log(note, NOTE_DURATION, index * NOTE_DURATION);
    //     synth.triggerAttackRelease(note, NOTE_DURATION, index * NOTE_DURATION);
    // });
};
