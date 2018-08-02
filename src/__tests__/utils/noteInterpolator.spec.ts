import { NoteInterpolator } from "utils/noteInterpolator";

describe("NoteInterpolator", () => {
    const CHORD_1 = {
        name: "1",
        id: "1",
        notes: ["C4", "D5", "F#4"], // 261.63 Hz, 587.33 Hz, 369.99 Hz
    };
    const CHORD_2 = {
        name: "2",
        id: "2",
        notes: ["A5"], // 880 Hz
    };
    const CHORD_3 = {
        name: "3",
        id: "3",
        notes: ["A4", "A5", "A4"], // 440 Hz, 880 Hz, 440 Hz
    };
    const CHORD_4 = {
        name: "4",
        id: "4",
        notes: ([] as string[]),
    };

    it("should work for basic cases without snap", () => {
        const interpolator = new NoteInterpolator({ snapFactor: 0 });
        const chords = [CHORD_1, CHORD_2];
        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0);
        expect(result1).toEqual([
            { frequency: 261.63, weight: 1},
            { frequency: 369.99, weight: 1},
            { frequency: 587.33, weight: 1},
        ]);
        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 1);
        expect(result2).toEqual([
            { frequency: 880, weight: 1},
            { frequency: null, weight: 0},
            { frequency: null, weight: 0},
        ]);

        const result3 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.5);
        expect(result3).toEqual([
            { frequency: 570.815, weight: 1},
            { frequency: 369.99, weight: 0.5},
            { frequency: 587.33, weight: 0.5},
        ]);
    });

    it("should work for basic cases with snap", () => {
        // TODO
    });

    it("should work for basic cases with total snap", () => {
        // TODO
    });

    it("should work for empty chords", () => {
        // TODO
    });

    it("should work for different sized chords", () => {
        // TODO
    });

    it("should work after changing chords", () => {
        // TODO
    });

});
