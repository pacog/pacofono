import { SET_CURRENT_PART, actionCreators } from "store/actions/currentSongPart";

describe("currentSongPart store actions", () => {
    it("should have a set current song part action", () => {
        const part = {
            id: "423",
            name: "Chorus 1",
            chords: ["chrdId"],
        };
        expect(actionCreators.setCurrentPart(part))
            .toEqual({
                type: SET_CURRENT_PART,
                part,
            });
    });
});
