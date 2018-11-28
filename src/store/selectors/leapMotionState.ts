import { IRootState } from "store/reducers/root";

export const isConnected = (state: IRootState): boolean => {
    return state.leapMotionState.isConnected;
};

export const isFocused = (state: IRootState): boolean => {
    return state.leapMotionState.isFocused;
};
