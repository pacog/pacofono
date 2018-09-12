// Generates the music taking into account user input
import { IChord } from "types";
import { log } from "utils/log";
import { pointerStartObservable, pointerMoveObservable, pointerEndObservable } from "modules/inputManager";
import { currentChordsChangeObservable } from "store/storeChanges";
import { create as createSynth, PFPolySynth } from "modules/polySynth";
import { getMaxNotesInChords } from "utils/chordUtils";
import { NoteInterpolator } from "utils/noteInterpolator";
import { normalizeNoteWeights } from "utils/noteWeightNormalizer";
import { masterOutput } from "modules/masterOutput";
// TODO abstract that Polysynth to a "current instrument" that will contain synths, arpegiators and noise generators
// TODO when the soundConfig changes, we will notify the current instrument, and it will change accordingly (if needed)

const SNAP_FACTOR = 0.1;

export const init = () => {
    const noteInterpolator = new NoteInterpolator({ snapFactor: SNAP_FACTOR });
    let isPointerActive = false;
    let currentChords: IChord[] = [];
    let synth: PFPolySynth = null;

    pointerStartObservable.subscribe((where) => {
        isPointerActive = true;
        synth.setVolume(where.y);
        const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, where.x);
        synth.startPlayingNotes(normalizeNoteWeights(notes), 1);
    });

    pointerMoveObservable.subscribe((where) => {
        if (isPointerActive) {
            synth.setVolume(where.y);
            const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, where.x);
            synth.updateFrequenciesBeingPlayed(normalizeNoteWeights(notes));
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
        synth = createSynth({ voices: getMaxNotesInChords(currentChords) }, masterOutput);
        log("currentChords changed", currentChords);
    });
};
