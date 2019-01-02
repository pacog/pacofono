import { IParamRestriction, IControllableParam } from "types/index";

export const getStepToUse = (defaultRestrictions: IParamRestriction, param: IControllableParam): number => {
    let stepToUse = param.customStep;
    if (typeof stepToUse === "undefined") {
        stepToUse = defaultRestrictions.step;
    }
    if (typeof stepToUse === "undefined") {
        stepToUse = 0.01;
    }
    return stepToUse;
};

export const getMaxMinCustomValue =
    (defaultRestrictions: IParamRestriction, param: IControllableParam): number => {
        const stepToUse = getStepToUse(defaultRestrictions, param);
        if (typeof param.customMax !== "undefined") {
            return param.customMax - stepToUse;
        }
        return defaultRestrictions.max - stepToUse;
    };


export const getMinMaxCustomValue =
    (defaultRestrictions: IParamRestriction, param: IControllableParam): number => {
        const stepToUse = getStepToUse(defaultRestrictions, param);
        if (typeof param.customMin !== "undefined") {
            return param.customMin + stepToUse;
        }
        return defaultRestrictions.min + stepToUse;
    };
