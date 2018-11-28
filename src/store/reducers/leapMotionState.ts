import { combineReducers } from "redux";
import { RootAction } from "store/actions";
import {
    SET_FOCUSED,
    SET_CONNECTED,
} from "store/actions/leapMotionState";

export interface ILeapMotionState {
    readonly isConnected: boolean;
    readonly isFocused: boolean;
}

export const leapMotionStateReducer = combineReducers<ILeapMotionState>({
    isConnected,
    isFocused,
});

function isConnected(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SET_CONNECTED:
            return action.connected;
        default:
            return state;
    }
}

function isFocused(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SET_FOCUSED:
            return action.focused;
        default:
            return state;
    }
}
