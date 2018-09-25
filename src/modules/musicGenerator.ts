// Generates the music taking into account user input
import { IChord } from "types";
import { log } from "utils/log";
import { pointerStartObservable, pointerMoveObservable, pointerEndObservable } from "modules/inputManager";
import { currentChordsChangeObservable, synthTypeChangeObservable } from "store/storeChanges";
import { getMaxNotesInChords } from "utils/chordUtils";
import { NoteInterpolator } from "utils/noteInterpolator";
import { normalizeNoteWeights } from "utils/noteWeightNormalizer";
import { masterOutput } from "modules/masterOutput";
import { SoundPlayer } from "modules/soundPlayer";

const SNAP_FACTOR = 0.1;

export const init = () => {
    const noteInterpolator = new NoteInterpolator({ snapFactor: SNAP_FACTOR });
    let isPointerActive = false;
    let currentChords: IChord[] = [];
    let soundPlayer: SoundPlayer = null;

    pointerStartObservable.subscribe((where) => {
        // TODO this should trigger a change in parameter, and parameters be connected to the sound, that will react
        // or maybe use a class that connects all the inputs, listens to changes in sound config and notifies when a
        // parameter is updated
        isPointerActive = true;
        soundPlayer.setVolume(where.y);
        const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, where.x);
        soundPlayer.startPlayingNotes(normalizeNoteWeights(notes), 1);
    });

    pointerMoveObservable.subscribe((where) => {
        if (isPointerActive) {
            soundPlayer.setVolume(where.y);
            const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, where.x);
            soundPlayer.updateFrequenciesBeingPlayed(normalizeNoteWeights(notes));
        }
    });

    pointerEndObservable.subscribe(() => {
        isPointerActive = false;
        soundPlayer.stopPlaying();
    });

    currentChordsChangeObservable.subscribe((newChords) => {
        currentChords = newChords;
        if (soundPlayer) {
            soundPlayer.destroy();
        }
        soundPlayer = new SoundPlayer({ voices: getMaxNotesInChords(currentChords) }, masterOutput);
        log("currentChords changed", currentChords);
    });

    synthTypeChangeObservable.subscribe((newSynthType) => {
        console.log(newSynthType);
    });
};
