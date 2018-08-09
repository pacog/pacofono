import { SET_VOLUME, SET_MUTE, actionCreators } from "store/actions/mainVolume";

describe("mainVolume actions", () => {
    it("should have a setVolume action", () => {
        expect(actionCreators.setVolume(0.5))
            .toEqual({
                type: SET_VOLUME,
                volume: 0.5,
            });
    });

    it("should have a setMute action", () => {
        expect(actionCreators.setMute(true))
            .toEqual({
                type: SET_MUTE,
                mute: true,
            });

        expect(actionCreators.setMute(false))
            .toEqual({
                type: SET_MUTE,
                mute: false,
            });
    });
});
