// Generates the music taking into account user input
import { IChord } from "types";
import { log } from "utils/log";
import { pointerStartObservable, pointerMoveObservable, pointerEndObservable } from "modules/inputManager";
import { currentChordsChangeObservable } from "store/storeChanges";
import { create as createSynth, PFPolySynth } from "modules/polySynth";
import { getMaxNotesInChords } from "utils/chordUtils";

// TODO translate current chord plus position to list of notes with intensity
    // current chords + where + snapAmmount = chordsWithWeights
// TODO create here the main output, that can be used to adjust volume, mute and show graphs
// TODO abstract that Polysynth to a "current instrument" that will contain synths, arpegiators and noise generators
// TODO when the soundConfig changes, we will notify the current instrument, and it will change accordingly (if needed)


export const init = () => {
    let isPointerActive = false;
    let currentChords: IChord[] = [];
    let synth: PFPolySynth = null;

    pointerStartObservable.subscribe((where) => {
        isPointerActive = true;
        synth.setVolume(where.y);
        // const chordsWithWeights
        synth.startPlayingChord(currentChords[0], 1);
    });

    pointerMoveObservable.subscribe((where) => {
        if (isPointerActive) {
            synth.setVolume(where.y);
        }
    });

    pointerEndObservable.subscribe(() => {
        isPointerActive = false;
        synth.stopPlaying();
    });

    currentChordsChangeObservable.subscribe((newChords) => {
        currentChords = newChords;
        if (synth) {
            synth.destroy();
        }
        synth = createSynth({ voices: getMaxNotesInChords(currentChords) });
        log("currentChords changed", currentChords);
    });
};
