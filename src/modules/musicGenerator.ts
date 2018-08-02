// Generates the music taking into account user input
import { IChord } from "types";
import { log } from "utils/log";
import { pointerStartObservable, pointerMoveObservable, pointerEndObservable } from "modules/inputManager";
import { currentChordsChangeObservable } from "store/storeChanges";
import { create as createSynth, PFPolySynth } from "modules/polySynth";
import { getMaxNotesInChords } from "utils/chordUtils";
import { NoteInterpolator } from "utils/noteInterpolator";

// TODO create component to debug synths, that uses observable to update and shows freq and volume of each synth.
// TODO create here the main output, that can be used to adjust volume, mute and show graphs
// TODO abstract that Polysynth to a "current instrument" that will contain synths, arpegiators and noise generators
// TODO when the soundConfig changes, we will notify the current instrument, and it will change accordingly (if needed)

const SNAP_FACTOR = 0.8;

export const init = () => {
    const noteInterpolator = new NoteInterpolator({ snapFactor: SNAP_FACTOR });
    let isPointerActive = false;
    let currentChords: IChord[] = [];
    let synth: PFPolySynth = null;

    pointerStartObservable.subscribe((where) => {
        isPointerActive = true;
        synth.setVolume(where.y);
        const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, where.x);
        synth.startPlayingNotes(notes, 1);
    });

    pointerMoveObservable.subscribe((where) => {
        if (isPointerActive) {
            synth.setVolume(where.y);
            const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, where.x);
            synth.updateFrequenciesBeingPlayed(notes);
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
