import { ADD_PART, DELETE_PART, CHANGE_PART_NAME, actionCreators } from "store/actions/parts";

const TEST_PART = {
    id: "blach",
    name: "bloch",
    chords: ["chordId"],
};

describe("Parts store actions", () => {
    it("should have an add part action", () => {
        const songId = "song_34";
        expect(actionCreators.addPart(TEST_PART, songId)).toEqual({
            type: ADD_PART,
            part: TEST_PART,
            songId,
        });
    });

    it("should have a delete part action", () => {
        const songId = "song_34";
        expect(actionCreators.deletePart(TEST_PART, songId)).toEqual({
            type: DELETE_PART,
            part: TEST_PART,
            songId,
        });
    });

    it("should have a change part name action", () => {
        const newName = "new name";
        expect(actionCreators.changePartName(TEST_PART, newName)).toEqual({
            type: CHANGE_PART_NAME,
            part: TEST_PART,
            newName,
        });
    });
});
