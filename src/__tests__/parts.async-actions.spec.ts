import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { actionCreators } from "store/actions/parts";
import { duplicatePart, cascadeDeletePart } from "store/actions/parts";

const TEST_PART = {
    id: "part_1",
    name: "bloch",
    chords: ["chordId"],
};

jest.mock("uuid", () => {
    let num = 1;
    return {
        v1: jest.fn(() => "uuid_" + (num++).toString()),
    };
});

describe("Parts store async actions", () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    describe("duplicatePart", () => {
        it("should work", async () => {
            expect.assertions(2);
            const store = mockStore({});
            const copiedPart = await store.dispatch(duplicatePart(TEST_PART, "song_12") as any);
            const copiedPartAsItShouldBe = {
                ...TEST_PART,
                id: "uuid_1",
            };
            expect(copiedPart).toEqual(copiedPartAsItShouldBe);
            expect(store.getActions()).toEqual([
                actionCreators.addPart(copiedPartAsItShouldBe, "song_12"),
            ]);
        });
    });

    describe("cascadeDeletePart", () => {
        it("should work", async () => {
            expect.assertions(2);
            const store = mockStore({});
            const deletedPart = await store.dispatch(cascadeDeletePart(TEST_PART, "song_12") as any);
            expect(deletedPart).toEqual(TEST_PART);
            expect(store.getActions()).toEqual([
                actionCreators.deletePart(TEST_PART, "song_12"),
            ]);
        });
    });

});
