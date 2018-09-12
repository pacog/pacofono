import { IRootState } from "store/reducers/root";

export const isSynthDebuggerShown = (state: IRootState): boolean => {
    return state.mainOptions.showSynthDebugger;
};

export const isAudioOuputShown = (state: IRootState): boolean => {
    return state.mainOptions.showAudioOuput;
};
