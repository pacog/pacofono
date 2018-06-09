import { actionCreators } from "store/actions/musicMode";
import { musicModeReducer } from "store/reducers/musicMode";
import { rootReducer } from "store/reducers/root";

describe("musicMode store reducer", () => {
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
