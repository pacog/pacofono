import { actionCreators } from "store/actions/mainVolume";
import { rootReducer } from "store/reducers/root";
import { getVolume, isMuted } from "store/selectors/mainVolume";

describe("mainVolume store selectors", () => {
    it("should be able to get info about muted and volume", () => {
        const state = rootReducer({}, { type: null });
        expect(getVolume(state)).toBe(1);
        expect(isMuted(state)).toBe(false);
        const newState = rootReducer(state, actionCreators.setVolume(0.5));
        expect(getVolume(newState)).toBe(0.5);
        expect(isMuted(newState)).toBe(false);
        const newState2 = rootReducer(newState, actionCreators.setMute(true));
        expect(getVolume(newState2)).toBe(0.5);
        expect(isMuted(newState2)).toBe(true);
    });

});
