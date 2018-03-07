import { CHANGE_MUSIC_MODE, actionCreators } from "store/actions/musicMode";
import { musicModeReducer } from "store/reducers/musicMode";
import { rootReducer } from "store/reducers/root";
import { getMusicMode } from "store/selectors/musicMode";

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

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.musicMode).toEqual({
                mode: "song",
            });
        });

        it("should process changing values", () => {
            const state = rootReducer({}, { type: null });
            expect(musicModeReducer(state.musicMode, actionCreators.changeMusicMode("newMusicMode")))
                .toEqual({
                    mode: "newMusicMode",
                });
        });
    });

    describe("selectors", () => {
        it("should be able to get musicMode", () => {
            const state = rootReducer({}, { type: null });
            expect(getMusicMode(state)).toBe("song");
            const newState = rootReducer(state, actionCreators.changeMusicMode("newMusicMode2"));
            expect(getMusicMode(newState)).toBe("newMusicMode2");
        });
    });

});
