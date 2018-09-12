export const SET_SHOW_SYNTH_DEBUGGER = "SET_SHOW_SYNTH_DEBUGGER";
export const SET_SHOW_AUDIO_OUPUT = "SET_SHOW_AUDIO_OUPUT";

export interface IMainOptionsActions {
    SET_SHOW_SYNTH_DEBUGGER: {
        type: typeof SET_SHOW_SYNTH_DEBUGGER,
        show: boolean,
    };
    SET_SHOW_AUDIO_OUPUT: {
        type: typeof SET_SHOW_AUDIO_OUPUT,
        show: boolean,
    };
}

export const actionCreators = {
    setShowSynthDebugger: (show: boolean): IMainOptionsActions[typeof SET_SHOW_SYNTH_DEBUGGER] => ({
        type: SET_SHOW_SYNTH_DEBUGGER,
        show,
    }),
    setShowAudioOutput: (show: boolean): IMainOptionsActions[typeof SET_SHOW_AUDIO_OUPUT] => ({
        type: SET_SHOW_AUDIO_OUPUT,
        show,
    }),
};
