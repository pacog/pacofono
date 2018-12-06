export enum ControllerParams {
    none = "None",
    xRatio = "xRatio",
    yRatio = "yRatio",
    zRatio = "zRatio",
}

export type ControlPoints = number[];

export interface IControllableParam {
    defaultValue: number;
    controllerParam: ControllerParams;
    inputTransformControlPoints: ControlPoints;
}

export interface IControllerFrame {
    timestamp: number;
    isPlaying: boolean;
    [ControllerParams.xRatio]: number;
    [ControllerParams.yRatio]: number;
    [ControllerParams.zRatio]: number;
}
