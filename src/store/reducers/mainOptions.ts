import { combineReducers } from "redux";
import { RootAction } from "store/actions";
import { SET_SHOW_SYNTH_DEBUGGER } from "store/actions/mainOptions";

export interface IMainOptionsState {
    readonly showSynthDebugger: boolean;
}

export const mainOptionsReducer = combineReducers<IMainOptionsState>({
    showSynthDebugger,
});

function showSynthDebugger(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SET_SHOW_SYNTH_DEBUGGER:
            return action.show;
        default:
            return state;
    }
}
