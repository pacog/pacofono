import { combineReducers } from "redux";
import { RootAction } from "store/actions";
import { SET_MUTE, SET_VOLUME } from "store/actions/mainVolume";

export interface IMainVolumeState {
    readonly volume: number;
    readonly mute: boolean;
}

export const mainVolumeReducer = combineReducers<IMainVolumeState>({
    volume,
    mute,
});

function volume(state: number = 1, action: RootAction) {
    switch (action.type) {
        case SET_VOLUME:
            return action.volume;
        default:
            return state;
    }
}

function mute(state: boolean = false, action: RootAction) {
    switch (action.type) {
        case SET_MUTE:
            return action.mute;
        default:
            return state;
    }
}
