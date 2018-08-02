// Computes the notes and volumes for each to play from a screen position and a list of chords
import { INoteWithWeight, IChord } from "types";
import { getMaxNotesInChords } from "utils/chordUtils";
import { allNotes } from "constants/notes";
interface INoteInterpolatorOptions {
    snapFactor: number;
}

interface IChordsInvolved {
    chord1: number; // index of first chord
    chord2: number; // index of second chord
    distance: number; // distance (0 is first chord, 1 is second chord)
}

export class NoteInterpolator {

    private options: INoteInterpolatorOptions;
    private lastChords: IChord[] = null;

    // Stores the frequencies for each note in each chord, each row a chord (by index),
    // Each column a frequency ordered from min to max, with null if not applicable
    private notesMatrix: number[][];

    constructor(options: INoteInterpolatorOptions) {
        this.options = options;
    }

    // xPosition is from 0 to 1
    public getNotesWithWeigthsFromChordsAndPosition(chords: IChord[], xPosition: number): INoteWithWeight[] {
        this.generateNoteCacheIfNeeded(chords);
        const chordsInvolved = getChordsInvolved(chords.length, xPosition);
        return getNotesFromChordsInvolved(chordsInvolved, this.notesMatrix, this.options.snapFactor);
    }

    private generateNoteCacheIfNeeded(chords: IChord[]): void {
        if (chords !== this.lastChords) {
            this.lastChords = chords;
            const maxNotes = getMaxNotesInChords(chords);
            this.notesMatrix = chords.map((eachChord) => getFrequenciesOrdered(eachChord.notes, maxNotes));
        }
    }
}

function getFrequenciesOrdered(notes: string[], totalNotes: number): number[] {
    const frequencies = new Array(totalNotes).fill(null);
    const freqsForNotes = notes.map((note) => allNotes.get(note).frequency).sort();
    return frequencies.map((notFilledFreq, index) => freqsForNotes[index] || notFilledFreq);
}

function getChordsInvolved(totalChords: number, xPosition: number): IChordsInvolved {
    const slices = totalChords * 2;
    const positionInSlices = xPosition * slices;

    // Get the simple cases out, only one chord involved
    if (positionInSlices <= 1) { // Before the first chord
        return { chord1: 0, chord2: null, distance: 0 };
    }
    if (positionInSlices >= (slices - 1)) { // After the last chord
        return { chord1: totalChords - 1, chord2: null, distance: 0 };
    }
    if ((positionInSlices === Math.round(positionInSlices)) && (positionInSlices % 2) === 1) { // Exactly on one chord
        return { chord1: (positionInSlices - 1) / 2, chord2: null, distance: 0 };
    }

    const renormalizedPosition = (positionInSlices / 2) - 0.5;
    const lowerChord = Math.floor(renormalizedPosition);
    const upperChord = lowerChord + 1;
    const positionBetweenChords = renormalizedPosition - lowerChord;

    return { chord1: lowerChord, chord2: upperChord, distance: positionBetweenChords };
}

function getNotesFromChordsInvolved(chordsInvolved: IChordsInvolved, notesMatrix: number[][], snapFactor: number)
: INoteWithWeight[] {
    return notesMatrix[chordsInvolved.chord1].map((freqInChord1, index) => {
        let freqInChord2 = null;
        if (chordsInvolved.chord2 !== null) {
            freqInChord2 = notesMatrix[chordsInvolved.chord2][index];
        }
        return getNoteWithWeight(freqInChord1, freqInChord2, chordsInvolved.distance);
    });
}

function getNoteWithWeight(freq1: number, freq2: number, distance: number): INoteWithWeight {
    if (freq1 === null && freq2 === null) {
        return { frequency: null, weight: 0 };
    }
    // We fade out if one of the notes is not there
    if (freq1 === null) {
        return { frequency: freq2, weight: distance };
    }
    if (freq2 === null) {
        return { frequency: freq1, weight: 1 - distance };
    }

    // Normal case, just return a freq in the middle, interpolating with distance
    return {
        frequency: freq1 + ((freq2 - freq1) * distance),
        weight: 1,
    };
}
