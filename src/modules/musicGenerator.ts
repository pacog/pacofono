// Generates the music taking into account user input
import { IChord } from "types";
import { log } from "utils/log";
import { inputActiveObservable, inputChangeObservable } from "modules/input/currentInput";
import { currentChordsChangeObservable, synthChangeObservable } from "store/storeChanges";
import { getMaxNotesInChords } from "utils/chordUtils";
import { NoteInterpolator } from "utils/noteInterpolator";
import { normalizeNoteWeights } from "utils/noteWeightNormalizer";
import { masterOutput } from "modules/masterOutput";
import { SoundPlayer } from "modules/soundPlayer";

const SNAP_FACTOR = 0.1;

export const init = () => {
    const soundPlayer = new SoundPlayer(masterOutput);
    const noteInterpolator = new NoteInterpolator({ snapFactor: SNAP_FACTOR });
    let currentChords: IChord[] = [];
    let isPlaying = false;

    console.log(inputActiveObservable);
    inputActiveObservable.subscribe((isActive) => {
        if (!isActive && isPlaying) {
            soundPlayer.stopPlaying();
            isPlaying = false;
        }
    });

    inputChangeObservable.subscribe((frame) => {
        if (!frame.isPlaying) {
            return;
        }
        isPlaying = true;
        soundPlayer.setVolume(frame.yRatio);
        const notes = noteInterpolator.getNotesWithWeigthsFromChordsAndPosition(currentChords, frame.xRatio);
        if (isPlaying) {
            soundPlayer.updateFrequenciesBeingPlayed(normalizeNoteWeights(notes));
        } else {
            soundPlayer.startPlayingNotes(normalizeNoteWeights(notes), 1);
        }
    });

    currentChordsChangeObservable.subscribe((newChords) => {
        currentChords = newChords;
        soundPlayer.setNumberOfVoices(getMaxNotesInChords(currentChords));
        log("currentChords changed", currentChords);
    });

    synthChangeObservable.subscribe((newSynth) => {
        log("newSynth", newSynth);
        soundPlayer.updateSynth(newSynth);
    });
};
