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
    const freqsForNotes = notes.map((note) => allNotes.get(note).frequency).sort((a, b) => a - b);
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
        return getNoteWithWeight(freqInChord1, freqInChord2, chordsInvolved.distance, snapFactor);
    });
}

function getNoteWithWeight(freq1: number, freq2: number, distance: number, snapFactor: number): INoteWithWeight {
    if (freq1 === null && freq2 === null) {
        return { frequency: null, weight: 0 };
    }
    const snappedDistance = snapDistance(distance, snapFactor);
    let freqToUse = null;
    let weight = 0;

    // We fade out if one of the notes is not there
    if (freq1 === null) {
        freqToUse = freq2;
        weight = snappedDistance;
    } else if (freq2 === null) {
        freqToUse = freq1;
        weight = 1 - snappedDistance;
    } else {
        // Normal case, just return a freq in the middle, interpolating with distance
        freqToUse = freq1 + ((freq2 - freq1) * snappedDistance);
        weight = 1;
    }

    if (weight === 0) {
        freqToUse = null;
    }

    return {
        frequency: freqToUse,
        weight,
    };
}

function snapDistance(distance: number, snapFactor: number): number {
    if (snapFactor === 0) {
        return distance;
    }
    const lowSnapLimit = snapFactor / 2;
    const highSnapLimit = 1 - lowSnapLimit;
    if (distance < lowSnapLimit) {
        return 0;
    }
    if (distance >= highSnapLimit) {
        return 1;
    }

    return (distance - lowSnapLimit) / (highSnapLimit - lowSnapLimit);
    // not /0 since if they are the same it will have already return in the prev ifs
}
