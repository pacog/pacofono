import { IRootState } from "store/reducers/root";

export const getVolume = (state: IRootState): number => {
    return state.mainVolume.volume;
};

export const isMuted = (state: IRootState): boolean => {
    return state.mainVolume.mute;
};
