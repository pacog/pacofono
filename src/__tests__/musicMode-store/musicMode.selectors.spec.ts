import { actionCreators } from "store/actions/musicMode";
import { rootReducer } from "store/reducers/root";
import { getMusicMode } from "store/selectors/musicMode";

describe("musicMode store selectors", () => {
    it("should be able to get musicMode", () => {
        const state = rootReducer({}, { type: null });
        expect(getMusicMode(state)).toBe("song");
        const newState = rootReducer(state, actionCreators.changeMusicMode("newMusicMode2"));
        expect(getMusicMode(newState)).toBe("newMusicMode2");
    });
});
