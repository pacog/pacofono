import { SET_CURRENT_SONG, actionCreators } from "store/actions/currentSong";

describe("currentSong store actions", () => {
    it("should have a set current song action", () => {
        const song = {
            id: "42",
            name: "Tu fiesta",
            parts: ["partId"],
        };
        expect(actionCreators.setCurrentSong(song))
            .toEqual({
                type: SET_CURRENT_SONG,
                song,
            });
    });
});
