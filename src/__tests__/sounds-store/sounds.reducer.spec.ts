// import { actionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
// import { soundsReducer } from "store/reducers/sounds";
import defaultSound from "constants/defaultSound";

describe("Sounds store ", () => {

    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.sounds).toEqual({
            [defaultSound.id]: defaultSound,
        });
    });

});
