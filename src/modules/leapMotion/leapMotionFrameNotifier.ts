import Observable from "utils/observable";
import { IControllerFrame } from "types";

export const onFrame = new Observable<IControllerFrame>({ notifyOnSubscribe: false });
