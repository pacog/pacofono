import { RawSynthParams, ISound, isControllableParam } from "types";
import getControllableParamValue from "modules/getControllableParamValue";

export const getRawParamsFromConfig = (soundConfig: ISound): RawSynthParams => {
    return getRawParamsFromObj(soundConfig.params);
};

function getRawParamsFromObj(obj: any): RawSynthParams {
    const result: any = {};
    Object.keys(obj).forEach((paramKey) => {
        const paramValue = obj[paramKey];
        result[paramKey] = getRawValue(paramValue);
    });
    return result;
}

function getRawValue(value: any): string | number | object {
    if (typeof value === "string" || typeof value === "number") {
        return value;
    }
    if (isControllableParam(value)) {
        return getControllableParamValue(value, null);
    }
    if (typeof value === "object") {
        return getRawParamsFromObj(value);
    }
    return null;
}
