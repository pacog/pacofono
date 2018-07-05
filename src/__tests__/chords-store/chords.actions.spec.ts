import { ADD_CHORD, DELETE_CHORD, CHANGE_CHORD_NAME, TOGGLE_NOTE, actionCreators } from "store/actions/chords";

describe("chords store actions", () => {
    const TEST_CHORD = {
        id: "42",
        name: "D minor",
        notes: ["D"],
    };
    it("should have an add chord action", () => {
        expect(actionCreators.addChord(TEST_CHORD, "part_id_1"))
            .toEqual({
                type: ADD_CHORD,
                chord: TEST_CHORD,
                partId: "part_id_1",
            });
    });

    it("should have a delete chord action", () => {
        expect(actionCreators.deleteChord(TEST_CHORD, "part_id_1"))
            .toEqual({
                type: DELETE_CHORD,
                chord: TEST_CHORD,
                partId: "part_id_1",
            });
    });

    it("should have a change chord name action", () => {
        const newName = "new name";
        expect(actionCreators.changeChordName(TEST_CHORD, newName)).toEqual({
            type: CHANGE_CHORD_NAME,
            chord: TEST_CHORD,
            newName,
        });
    });

    it("should have a toggle note action", () => {
        const noteId = "A#4";
        expect(actionCreators.toggleNote(TEST_CHORD, noteId)).toEqual({
            type: TOGGLE_NOTE,
            chord: TEST_CHORD,
            noteId,
        });
    });
});
