import { actionCreators } from "store/actions/mainVolume";
import { mainVolumeReducer } from "store/reducers/mainVolume";
import { rootReducer } from "store/reducers/root";

describe("mainVolume store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.mainVolume).toEqual({
            volume: 1,
            mute: false,
        });
    });

    it("should process changing volume", () => {
        const state = rootReducer({}, { type: null });
        const stateAfter = mainVolumeReducer(state.mainVolume, actionCreators.setVolume(0.5));
        expect(stateAfter)
            .toEqual({
                volume: 0.5,
                mute: false,
            });
        const stateAfter2 = mainVolumeReducer(stateAfter, actionCreators.setVolume(0));
        expect(stateAfter2)
            .toEqual({
                volume: 0,
                mute: false,
            });

        const stateAfter3 = mainVolumeReducer(stateAfter2, actionCreators.setVolume(0.99));
        expect(stateAfter3)
            .toEqual({
                volume: 0.99,
                mute: false,
            });
    });

    it("should process changing mute", () => {
        const state = rootReducer({}, { type: null });
        const stateAfter = mainVolumeReducer(state.mainVolume, actionCreators.setMute(true));
        expect(stateAfter)
            .toEqual({
                volume: 1,
                mute: true,
            });
        const stateAfter2 = mainVolumeReducer(stateAfter, actionCreators.setMute(false));
        expect(stateAfter2)
            .toEqual({
                volume: 1,
                mute: false,
            });
    });
});
