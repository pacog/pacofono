import Leap = require("leapjs");
import { Store, AnyAction } from "redux";
import { IRootState } from "store/reducers/root";
import { actionCreators } from "store/actions/leapMotionState";
import { notifyFrame as throttleNotifyFrame } from "./leapMotionFrameThrottle";
import { parseFrame } from "./leapMotionFrameParser";
import { onFrame } from "./leapMotionFrameNotifier";
import { log } from "utils/log";

export const init = (store: Store<IRootState, AnyAction>): void => {
    const leapController = new Leap.Controller();
    startListening(leapController);
    leapController.connect();

    let isConnected = false;
    let isFocused = false;

    function startListening(controller: any): void {
        controller.on("blur", () => {
            log("leapMotionManager:blur");
            notifyBlur();
        });
        controller.on("streamingStarted", () => {
            log("leapMotionManager:streamingStarted");
            notifyConnected();
        });
        controller.on("streamingStopped", () => {
            log("leapMotionManager:streamingStopped");
            notifyDisconnected();
        });
        controller.on("focus", () => {
            log("leapMotionManager:focus");
            notifyFocus();
        });
        controller.on("frame", (frameInfo: any) => {
            throttleNotifyFrame(frameInfo, notifyFrame);
        });
    }

    function notifyConnected(): void {
        if (isConnected) {
            return;
        }
        isConnected = true;
        store.dispatch(actionCreators.setConnected(isConnected));
    }

    function notifyDisconnected(): void {
        if (!isConnected) {
            return;
        }
        isConnected = false;
        store.dispatch(actionCreators.setConnected(isConnected));
    }

    function notifyFocus(): void {
        if (isFocused) {
            return;
        }
        isFocused = true;
        store.dispatch(actionCreators.setFocused(isFocused));
    }

    function notifyBlur(): void {
        if (!isFocused) {
            return;
        }
        isFocused = false;
        store.dispatch(actionCreators.setFocused(isFocused));
    }

    function notifyFrame(frameInfo: any): void {
        onFrame.notify(parseFrame(frameInfo));
    }

};
