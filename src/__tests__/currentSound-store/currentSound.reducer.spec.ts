// import { actionCreators } from "store/actions/currentSound";
// import { currentSoundReducer } from "store/reducers/currentSong";
import { rootReducer } from "store/reducers/root";
import defaultSound from "constants/defaultSound";

describe("currentSound store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.currentSound).toEqual({
            id: defaultSound.id,
        });
    });
});
