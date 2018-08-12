import { actionCreators } from "store/actions/chords";
import { rootReducer } from "store/reducers/root";
import { getChordById, getPartChords } from "store/selectors/chords";
import createEmptyStore from "test-helpers/createEmptyStore";
import { getMockStore, data as mockData } from "test-helpers/mockStoreData";

describe("Chords store selectors", () => {
    describe("getChordById selector", () => {
        it("should get a chord after adding it", () => {
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

    describe("getPartChords selector", () => {
        it("should get the chords of a part", () => {
            const store = createEmptyStore(getMockStore());
            const state = store.getState();
            expect(getPartChords(state, mockData.PART_3))
                .toEqual([mockData.CHORD_3, mockData.CHORD_4]);
        });

        it("should memoize the result to get chords", () => {
            const store = createEmptyStore(getMockStore());
            const state = store.getState();

            const firstTry = getPartChords(state, mockData.PART_3);
            const secondTry = getPartChords(state, mockData.PART_3);
            expect(firstTry).toBe(secondTry);
        });

        it("should avoid memoization if there are changes", () => {
            const store = createEmptyStore(getMockStore());
            const initialState = store.getState();

            const firstTry = getPartChords(initialState, mockData.PART_3);

            const stateAfter = rootReducer(
                initialState,
                actionCreators.toggleNote(firstTry[0], "C4"),
            );
            const secondTry = getPartChords(stateAfter, mockData.PART_3);
            expect(firstTry).not.toBe(secondTry);
            const expectedResult = [{
                ...firstTry[0],
                notes: firstTry[0].notes.concat(["C4"]),
            }, firstTry[1]];
            expect(secondTry).toEqual(expectedResult);
        });

    });
});
