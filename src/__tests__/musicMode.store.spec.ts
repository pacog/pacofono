import { CHANGE_MUSIC_MODE, actionCreators } from "../store/actions/musicMode";
import { musicModeReducer } from "../store/reducers/musicMode";

describe("musicMode store", () => {

    describe("actions", () => {
        it("should have a change music mode action", () => {
            expect(actionCreators.changeMusicMode("newMusicMode"))
                .toEqual({
                    type: CHANGE_MUSIC_MODE,
                    newMode: "newMusicMode",
                });
        });
    });

    // TODO: finish this test once relative route module resolving is done
    describe("reducer", () => {
        it("should process changing values", () => {
            expect(musicModeReducer({
                mode: "song",
            }, actionCreators.changeMusicMode("newMusicMode")))
                .toEqual({
                    mode: "newMusicMode",
                });
        });
    });

    // TODO test selectors

});
