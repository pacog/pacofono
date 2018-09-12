import { combineReducers } from "redux";
import { RootAction } from "store/actions";
import {
    SET_SHOW_SYNTH_DEBUGGER,
    SET_SHOW_AUDIO_OUPUT,
} from "store/actions/mainOptions";

export interface IMainOptionsState {
    readonly showSynthDebugger: boolean;
    readonly showAudioOuput: boolean;
}

export const mainOptionsReducer = combineReducers<IMainOptionsState>({
    showSynthDebugger,
    showAudioOuput,
});

function showSynthDebugger(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SET_SHOW_SYNTH_DEBUGGER:
            return action.show;
        default:
            return state;
    }
}

function showAudioOuput(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SET_SHOW_AUDIO_OUPUT:
            return action.show;
        default:
            return state;
    }
}
