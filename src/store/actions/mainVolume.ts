export const SET_MUTE = "SET_MUTE";
export const SET_VOLUME = "SET_VOLUME";

export interface IMainVolumeActions {
    SET_MUTE: {
        type: typeof SET_MUTE,
        mute: boolean,
    };
    SET_VOLUME: {
        type: typeof SET_VOLUME,
        volume: number,
    };
}

export const actionCreators = {
    setMute: (mute: boolean): IMainVolumeActions[typeof SET_MUTE] => ({
        type: SET_MUTE,
        mute,
    }),
    setVolume: (volume: number): IMainVolumeActions[typeof SET_VOLUME] => ({
        type: SET_VOLUME,
        volume,
    }),
};
