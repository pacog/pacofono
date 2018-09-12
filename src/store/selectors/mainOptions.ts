import { IRootState } from "store/reducers/root";

export const isSynthDebuggerShown = (state: IRootState): boolean => {
    return state.mainOptions.showSynthDebugger;
};

export const isAudioOutputShown = (state: IRootState): boolean => {
    return state.mainOptions.showAudioOuput;
};
