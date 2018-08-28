export const SET_SHOW_SYNTH_DEBUGGER = "SET_SHOW_SYNTH_DEBUGGER";

export interface IMainOptionsActions {
    SET_SHOW_SYNTH_DEBUGGER: {
        type: typeof SET_SHOW_SYNTH_DEBUGGER,
        show: boolean,
    };
}

export const actionCreators = {
    setShowSynthDebugger: (show: boolean): IMainOptionsActions[typeof SET_SHOW_SYNTH_DEBUGGER] => ({
        type: SET_SHOW_SYNTH_DEBUGGER,
        show,
    }),
};
