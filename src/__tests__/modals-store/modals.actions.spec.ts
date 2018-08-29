import {
    OPEN_SONG_EDITOR,
    CLOSE_SONG_EDITOR,
    OPEN_MAIN_OPTIONS,
    CLOSE_MAIN_OPTIONS,
    actionCreators,
} from "store/actions/modals";

describe("modals store actions", () => {
    it("should have an open song editor action", () => {
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

    it("should have an open main options action", () => {
        expect(actionCreators.openMainOptions())
            .toEqual({
                type: OPEN_MAIN_OPTIONS,
            });
    });

    it("should have a close main options action", () => {
        expect(actionCreators.closeMainOptions())
            .toEqual({
                type: CLOSE_MAIN_OPTIONS,
            });
    });
});
