import { OPEN_SONG_SELECTOR, CLOSE_SONG_SELECTOR, actionCreators } from "store/actions/songSelector";

describe("songSelector store actions", () => {
    it("should have a open songSelector action", () => {
        expect(actionCreators.open())
            .toEqual({
                type: OPEN_SONG_SELECTOR,
            });
    });

    it("should have a close songSelector action", () => {
        expect(actionCreators.close())
            .toEqual({
                type: CLOSE_SONG_SELECTOR,
            });
    });
});
