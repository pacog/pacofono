// Receives all notifications of user input (mouse, touch, Leap) and lets other services subscribe to them
import { IPointRatio } from "types";
import Observable from "utils/observable";

export const pointerStartObservable = new Observable<IPointRatio>();
export const pointerMoveObservable = new Observable<IPointRatio>();
export const pointerEndObservable = new Observable<boolean>();
