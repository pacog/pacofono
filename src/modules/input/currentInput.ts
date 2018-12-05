import { IControllerFrame } from "types";
import Observable from "utils/observable";
import { onFrame as onLeapMotionFrame } from "modules/leapMotion/leapMotionFrameNotifier";
import { onFrame as onPointerFrame } from "modules/input/pointerInputManager";
import { leapMotionActiveObservable} from "store/storeChanges";

let onFrameUnsubscriber: () => void = null;

export const inputActiveObservable = new Observable<boolean>();
export const inputChangeObservable = new Observable<IControllerFrame>();

leapMotionActiveObservable.subscribe(onLeapMotionChange);

let inputIsActive = false;

function onLeapMotionChange(isActive: boolean) {
    destroyCurrentInputManager();
    if (isActive) {
        createLeapMotionInputManager();
    } else {
        createPointerInputManager();
    }
}

function destroyCurrentInputManager() {
    if (onFrameUnsubscriber) {
        onFrameUnsubscriber();
        onFrameUnsubscriber = null;
    }
    if (inputIsActive) {
        inputIsActive = false;
        inputActiveObservable.notify(false);
    }
}

function createLeapMotionInputManager() {
    onFrameUnsubscriber = onLeapMotionFrame.subscribe(handleFrame);
}

function createPointerInputManager() {
    onFrameUnsubscriber = onPointerFrame.subscribe(handleFrame);
}

function handleFrame(newFrame: IControllerFrame): void {
    updateInputActive(newFrame);
    inputChangeObservable.notify(newFrame);
}

function updateInputActive(frame: IControllerFrame): void {
    if (frame.isPlaying !== inputIsActive) {
        inputIsActive = frame.isPlaying;
        inputActiveObservable.notify(inputIsActive);
    }
}
