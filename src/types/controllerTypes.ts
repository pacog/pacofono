export enum ControllerParams {
    none = "None",
    xRatio = "xRatio",
    yRatio = "yRatio",
    zRatio = "zRatio",
}

export type ControlPoints = number[];

export interface IControllableParam {
    name: string;
    defaultValue: number;
    controllerParam: ControllerParams;
    inputTransformControlPoints: ControlPoints;
    customMin?: number;
    customMax?: number;
    customStep?: number;
}

export const isControllableParam = (value: any): value is IControllableParam => {
    if (typeof value !== "object") {
        return false;
    }
    return (value as IControllableParam).defaultValue !== undefined &&
        (value as IControllableParam).controllerParam !== undefined &&
        (value as IControllableParam).inputTransformControlPoints !== undefined;
};

export const isNormalParam = (value: any): value is string | number => {
    if (typeof value === "string" || typeof value === "number") {
        return true;
    }
    return false;
};

export interface IControllerFrame {
    timestamp: number;
    isPlaying: boolean;
    [ControllerParams.xRatio]: number;
    [ControllerParams.yRatio]: number;
    [ControllerParams.zRatio]: number;
}

export interface IParamRestriction {
    min: number;
    max: number;
    step?: number;
}
