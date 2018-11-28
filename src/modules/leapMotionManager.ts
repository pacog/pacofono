import Leap = require("leapjs");
import { Store, AnyAction } from "redux";
import { IRootState } from "store/reducers/root";
import { actionCreators } from "store/actions/leapMotionState";

export const init = (store: Store<IRootState, AnyAction>) => {
    const leapController = new Leap.Controller();
    startListening(leapController);
    leapController.connect();

    let isConnected = false;
    let isFocused = false;

    function startListening(controller: any) {
        controller.on("blur", () => {
            notifyBlur();
        });
        controller.on("connect", () => {
            notifyConnected();
        });
        controller.on("disconnect", () => {
            notifyDisconnected();
        });
        controller.on("focus", () => {
            notifyFocus();
        });
        controller.on("frame", (event: any) => {
            // console.log("frame", event);
        });
    }

    function notifyConnected() {
        if (isConnected) {
            return;
        }
        isConnected = true;
        store.dispatch(actionCreators.setConnected(isConnected));
    }

    function notifyDisconnected() {
        if (!isConnected) {
            return;
        }
        isConnected = false;
        store.dispatch(actionCreators.setConnected(isConnected));
    }

    function notifyFocus() {
        if (isFocused) {
            return;
        }
        isFocused = true;
        store.dispatch(actionCreators.setFocused(isFocused));
    }

    function notifyBlur() {
        if (!isFocused) {
            return;
        }
        isFocused = false;
        store.dispatch(actionCreators.setFocused(isFocused));
    }

};
