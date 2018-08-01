import { getMaxNotesInChords } from "utils/chordUtils";

describe("getMaxNotesInChords", () => {
    const CHORD_1 = {
        name: "1",
        id: "1",
        notes: ["C4", "D5", "F#4"],
    };
    const CHORD_2 = {
        name: "2",
        id: "2",
        notes: ["C4"],
    };
    const CHORD_3 = {
        name: "3",
        id: "3",
        notes: ([] as string[]),
    };
    it("should get max voices correctly", () => {
        expect(getMaxNotesInChords([CHORD_1, CHORD_2, CHORD_3])).toBe(3);
        expect(getMaxNotesInChords([CHORD_2, CHORD_3])).toBe(1);
        expect(getMaxNotesInChords([CHORD_3])).toBe(0);
        expect(getMaxNotesInChords([])).toBe(0);
        expect(getMaxNotesInChords(null)).toBe(0);
    });
});
