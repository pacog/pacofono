import { CHANGE_MUSIC_MODE, actionCreators } from "store/actions/musicMode";

describe("musicMode store actions", () => {
    it("should have a change music mode action", () => {
        expect(actionCreators.changeMusicMode("newMusicMode"))
            .toEqual({
                type: CHANGE_MUSIC_MODE,
                newMode: "newMusicMode",
            });
    });
});
