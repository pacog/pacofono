import { IControllableParam, IControllerFrame, ControllerParams, ControlPoints, IParamRestriction } from "types/index";
import getParamRestrictions from "constants/paramRestrictions";
import { clamp, projectValueToRange, snapToClosestStep } from "utils/math";

export const transformWithControlPoints = (value: number, controlPoints: ControlPoints): number => {
    const clampedValue = clamp(value, 0, 1);
    if (!controlPoints || !controlPoints.length) {
        return clampedValue;
    }
    if (controlPoints.length === 1) {
        return controlPoints[0];
    }
    if (clampedValue === 1) {
        return controlPoints[controlPoints.length - 1];
    }

    const ranges = controlPoints.length - 1;
    const rangeIndexForValue = Math.floor(clampedValue * ranges);
    const rangeStartOut = controlPoints[rangeIndexForValue];
    const rangeEndOut = controlPoints[rangeIndexForValue + 1];
    const rangeStartIn = rangeIndexForValue * (1 / ranges);
    const rangeEndIn = (rangeIndexForValue + 1) * (1 / ranges);

    return projectValueToRange({
        value: clampedValue,
        originRange: [rangeStartIn, rangeEndIn],
        destinationRange: [rangeStartOut, rangeEndOut],
    });
};

export const applyParamRestrictions = (ratio: number, paramRestrictions: IParamRestriction): number => {
    if (!paramRestrictions) {
        return ratio;
    }
    const nonSteppedResult = projectValueToRange({
        value: ratio,
        originRange: [0, 1],
        destinationRange: [paramRestrictions.min, paramRestrictions.max],
    });
    if (!paramRestrictions.step) {
        return nonSteppedResult;
    }
    return snapToClosestStep({
        value: nonSteppedResult,
        stepSize: paramRestrictions.step,
        rangeBegin: paramRestrictions.min,
    });
};

export const getControllableParamValue = (param: IControllableParam, frame: IControllerFrame): number => {
    if (!frame) {
        return param.defaultValue;
    }
    if (param.controllerParam === ControllerParams.none) {
        return param.defaultValue;
    }

    const frameValueForParam = frame[param.controllerParam];
    const transformedParam = transformWithControlPoints(frameValueForParam, param.inputTransformControlPoints);
    const paramRestrictions = getParamRestrictions(param.name);
    return applyParamRestrictions(transformedParam, paramRestrictions);
};
