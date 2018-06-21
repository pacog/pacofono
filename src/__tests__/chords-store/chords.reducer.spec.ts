import { actionCreators } from "store/actions/chords";
import { rootReducer } from "store/reducers/root";
import { chordsReducer } from "store/reducers/chords";

const examplePart = {
    name: "Part 12",
    id: "part_12",
    chords: ["other_chord"],
};

describe("Chords store reducer", () => {

    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.chords).toEqual({});
    });

    it("should be able to add a chord", () => {
        const partId = "part_12";
        const chordToAdd = {
            id: "newChordId",
            name: "D minor",
            notes: ["D", "F#"],
        };
        const initialState = rootReducer({
            parts: {
                [examplePart.id]: {...examplePart},
            },
        }, { type: null });
        const stateAfter = rootReducer(
            initialState,
            actionCreators.addChord(chordToAdd, partId),
        );
        expect(stateAfter.chords[chordToAdd.id]).toEqual(chordToAdd);
        expect(stateAfter.parts.part_12.chords).toEqual(["other_chord", "newChordId"]);
    });

    it("should be able to change the name of a chord", () => {
        const partId = "part_12";
        const chordToAdd = {
            id: "newChordId",
            name: "D minor",
            notes: ["D", "F#"],
        };
        const initialState = rootReducer({}, { type: null });
        const stateAfter = chordsReducer(
            initialState.chords,
            actionCreators.addChord(chordToAdd, partId),
        );
        const stateAfterRename = chordsReducer(
            stateAfter,
            actionCreators.changeChordName(chordToAdd, "NewChordName"),
        );
        expect(stateAfterRename[chordToAdd.id].name).toEqual("NewChordName");
    });

    it("should be able to delete a chord", () => {
        const partId = "part_12";
        const chordToAdd = {
            id: "newChordId",
            name: "D minor",
            notes: ["D", "F#"],
        };
        const initialState = rootReducer({
            parts: {
                [examplePart.id]: {...examplePart},
            },
        }, { type: null });
        const stateAfter = rootReducer(
            initialState,
            actionCreators.addChord(chordToAdd, partId),
        );
        const stateAfter2 = rootReducer(
            stateAfter,
            actionCreators.deleteChord(chordToAdd, partId),
        );
        expect(stateAfter2.chords[chordToAdd.id]).toEqual(undefined);
        expect(stateAfter2.parts.part_12.chords).toEqual(["other_chord"]);
    });
});
