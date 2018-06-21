import { actionCreators } from "store/actions/chords";
import { rootReducer } from "store/reducers/root";
import { getChordById } from "store/selectors/chords";

describe("Chords store selectors", () => {
    describe("getChordById selector", () => {
        it("should get a chord after adding ir", () => {
            const chordToAdd = {
                id: "id1",
                name: "MyChord",
                notes: ([] as string[]),
            };
            const state = rootReducer({}, { type: null });
            expect(getChordById(state, "id1")).toBe(undefined);

            const newState = rootReducer(state, actionCreators.addChord(chordToAdd, "part_1"));
            expect(getChordById(newState, "id1")).toEqual(chordToAdd);
        });
    });
});
