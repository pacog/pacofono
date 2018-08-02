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
        const chords = [CHORD_1, CHORD_3];
        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0);
        expect(result1).toEqual([
            { frequency: 261.63, weight: 1},
            { frequency: 369.99, weight: 1},
            { frequency: 587.33, weight: 1},
        ]);
        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 1);
        expect(result2).toEqual([
            { frequency: 440, weight: 1},
            { frequency: 440, weight: 1},
            { frequency: 880, weight: 1},
        ]);

        const result3 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.5);
        expect(result3).toEqual([
            { frequency: 339.2892571243602, weight: 1},
            { frequency: 403.47936750223084, weight: 1},
            { frequency: 718.9230835075476, weight: 1},
        ]);

        const result4 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.375);
        expect(result4).toEqual([
            { frequency: 297.9400079570489, weight: 1},
            { frequency: 386.37201138559504, weight: 1},
            { frequency: 649.8038893670059, weight: 1},
        ]);
    });

    it("should work for basic cases with snap", () => {
        const interpolator = new NoteInterpolator({ snapFactor: 0.5 });
        const chords = [CHORD_1, CHORD_2];
        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.375);
        expect(result1).toEqual([
            { frequency: 261.63000000000005, weight: 1},
            { frequency: 369.99, weight: 1},
            { frequency: 587.33, weight: 1},
        ]);
        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.5);
        expect(result2).toEqual([
            { frequency: 479.8274689927624, weight: 1},
            { frequency: 369.99, weight: 0.5},
            { frequency: 587.33, weight: 0.5},
        ]);
        const result3 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.4);
        expect(result3).toEqual([
            { frequency: 295.3704565638323, weight: 1},
            { frequency: 369.99, weight: 0.8999999999999999},
            { frequency: 587.33, weight: 0.8999999999999999},
        ]);
        const result4 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.625);
        expect(result4).toEqual([
            { frequency: 880.0000000000002, weight: 1},
            { frequency: null, weight: 0},
            { frequency: null, weight: 0},
        ]);
        const result5 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.6);
        expect(result5).toEqual([
            { frequency: 779.4767380543501, weight: 1},
            { frequency: 369.99, weight: 0.10000000000000009},
            { frequency: 587.33, weight: 0.10000000000000009},
        ]);
    });

    it("should work for basic cases with total snap", () => {
        const interpolator = new NoteInterpolator({ snapFactor: 1 });
        const chords = [CHORD_1, CHORD_2];
        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.499);
        expect(result1).toEqual([
            { frequency: 261.63000000000005, weight: 1},
            { frequency: 369.99, weight: 1},
            { frequency: 587.33, weight: 1},
        ]);

        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.500);
        expect(result2).toEqual([
            { frequency: 880.0000000000002, weight: 1},
            { frequency: null, weight: 0},
            { frequency: null, weight: 0},
        ]);
    });

    it("should work for empty chords", () => {
        const interpolator = new NoteInterpolator({ snapFactor: 0 });
        const chords = [CHORD_3, CHORD_4];

        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0);
        expect(result1).toEqual([
            { frequency: 440, weight: 1},
            { frequency: 440, weight: 1},
            { frequency: 880, weight: 1},
        ]);

        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.5);
        expect(result2).toEqual([
            { frequency: 440, weight: 0.5},
            { frequency: 440, weight: 0.5},
            { frequency: 880, weight: 0.5},
        ]);

        const result3 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 1);
        expect(result3).toEqual([
            { frequency: null, weight: 0},
            { frequency: null, weight: 0},
            { frequency: null, weight: 0},
        ]);
    });

    it("should work for only one chord", () => {
        const interpolator = new NoteInterpolator({ snapFactor: 0 });
        const chords = [CHORD_3];

        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0);
        expect(result1).toEqual([
            { frequency: 440, weight: 1},
            { frequency: 440, weight: 1},
            { frequency: 880, weight: 1},
        ]);
        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.5);
        expect(result2).toEqual([
            { frequency: 440, weight: 1},
            { frequency: 440, weight: 1},
            { frequency: 880, weight: 1},
        ]);
        const result3 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 1);
        expect(result3).toEqual([
            { frequency: 440, weight: 1},
            { frequency: 440, weight: 1},
            { frequency: 880, weight: 1},
        ]);
    });

    it("should work for different sized chords", () => {
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
            { frequency: 479.8274689927624, weight: 1},
            { frequency: 369.99, weight: 0.5},
            { frequency: 587.33, weight: 0.5},
        ]);

        const result4 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.375);
        expect(result4).toEqual([
            { frequency: 354.3123773064899, weight: 1},
            { frequency: 369.99, weight: 0.75},
            { frequency: 587.33, weight: 0.75},
        ]);
    });

    it("should work after changing chords", () => {
        const interpolator = new NoteInterpolator({ snapFactor: 0 });
        const chords = [CHORD_1, CHORD_3];
        const result1 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords, 0.5);
        expect(result1).toEqual([
            { frequency: 339.2892571243602, weight: 1},
            { frequency: 403.47936750223084, weight: 1},
            { frequency: 718.9230835075476, weight: 1},
        ]);
        const chords2 = [CHORD_1, CHORD_2];
        const result2 = interpolator.getNotesWithWeigthsFromChordsAndPosition(chords2, 0.5);
        expect(result2).toEqual([
            { frequency: 479.8274689927624, weight: 1},
            { frequency: 369.99, weight: 0.5},
            { frequency: 587.33, weight: 0.5},
        ]);
    });

});
