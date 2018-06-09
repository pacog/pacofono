import { OPEN_SONG_EDITOR, CLOSE_SONG_EDITOR, actionCreators } from "store/actions/modals";

describe("modals store actions", () => {
    it("should have a open song editor action", () => {
        expect(actionCreators.openSongEditor())
            .toEqual({
                type: OPEN_SONG_EDITOR,
            });
    });

    it("should have a close song editor action", () => {
        expect(actionCreators.closeSongEditor())
            .toEqual({
                type: CLOSE_SONG_EDITOR,
            });
    });
});
