export const SET_CONNECTED = "SET_CONNECTED";
export const SET_FOCUSED = "SET_FOCUSED";

export interface ILeapMotionStateActions {
    SET_CONNECTED: {
        type: typeof SET_CONNECTED,
        connected: boolean,
    };
    SET_FOCUSED: {
        type: typeof SET_FOCUSED,
        focused: boolean,
    };
}

export const actionCreators = {
    setConnected: (connected: boolean): ILeapMotionStateActions[typeof SET_CONNECTED] => ({
        type: SET_CONNECTED,
        connected,
    }),
    setFocused: (focused: boolean): ILeapMotionStateActions[typeof SET_FOCUSED] => ({
        type: SET_FOCUSED,
        focused,
    }),
};
