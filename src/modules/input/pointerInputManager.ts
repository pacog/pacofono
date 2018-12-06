// Receives all notifications of user input (mouse, touch, Leap) and lets other services subscribe to them
import { IPoint2DRatio } from "types";
import Observable from "utils/observable";
import { IControllerFrame } from "types";

export const pointerStartObservable = new Observable<IPoint2DRatio>();
export const pointerMoveObservable = new Observable<IPoint2DRatio>();
export const pointerEndObservable = new Observable<boolean>();

export const onFrame = new Observable<IControllerFrame>({ notifyOnSubscribe: false });

const DEFAULT_EMPTY_FRAME: IControllerFrame = {
    timestamp: null,
    isPlaying: false,
    xRatio: 0,
    yRatio: 0,
    zRatio: 0.5,
};
let isPlaying: boolean = false;

pointerStartObservable.subscribe((point: IPoint2DRatio) => {
    isPlaying = true;
    notifyFrame(point);
});

pointerMoveObservable.subscribe((point: IPoint2DRatio) => {
    notifyFrame(point);
});

pointerEndObservable.subscribe(() => {
    isPlaying = false;
    notifyFrame(null);
});

function notifyFrame(point: IPoint2DRatio): void {
    if (point) {
        onFrame.notify({
            timestamp: window.performance.now(),
            isPlaying,
            xRatio: point.x,
            yRatio: point.y,
            zRatio: 0.5,
        });
    } else {
        onFrame.notify({
            ...DEFAULT_EMPTY_FRAME,
            timestamp: window.performance.now(),
            isPlaying,
        });
    }
}
