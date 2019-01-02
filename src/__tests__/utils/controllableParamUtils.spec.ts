import { ControllerParams } from "types/index";
import { getStepToUse, getMaxMinCustomValue, getMinMaxCustomValue } from "utils/controllableParamUtils";

const defaultRestriction = {
    max: 10,
    min: 1,
    step: 0.2,
};

const defaultParam = {
    customMin: 2,
    customMax: 8,
    customStep: 0.5,
    defaultValue: 5,
    name: "defaultParam",
    controllerParam: ControllerParams.xRatio,
    inputTransformControlPoints: [0, 1],
};

describe("getStepToUse", () => {
    it("should get step value correctly", () => {
        expect(getStepToUse(defaultRestriction, defaultParam)).toBe(0.5);
    });

    it("should use restriction if not available in param", () => {
        expect(getStepToUse(defaultRestriction, { ...defaultParam, customStep: undefined })).toBe(0.2);
    });

    it("should use 0.01 if not available anywhere", () => {
        expect(getStepToUse(
            { ...defaultRestriction, step: undefined },
            { ...defaultParam, customStep: undefined },
        )).toBe(0.01);
    });
});

describe("getMaxMinCustomValue", () => {
    it("should get value correctly", () => {
        expect(getMaxMinCustomValue(defaultRestriction, defaultParam)).toBe(7.5);
    });

    it("should get value correctly when no step is available", () => {
        expect(getMaxMinCustomValue(
            { ...defaultRestriction, step: undefined },
            { ...defaultParam, customStep: undefined },
        )).toBe(7.99);
    });

    it("should get value correctly when no max is available", () => {
        expect(getMaxMinCustomValue(
            { ...defaultRestriction },
            { ...defaultParam, customMax: undefined },
        )).toBe(9.5);
    });
});

describe("getMinMaxCustomValue", () => {
    it("should get value correctly", () => {
        expect(getMinMaxCustomValue(defaultRestriction, defaultParam)).toBe(2.5);
    });

    it("should get value correctly when no step is available", () => {
        expect(getMinMaxCustomValue(
            { ...defaultRestriction, step: undefined },
            { ...defaultParam, customStep: undefined },
        )).toBe(2.01);
    });

    it("should get value correctly when no max is available", () => {
        expect(getMinMaxCustomValue(
            { ...defaultRestriction },
            { ...defaultParam, customMin: undefined },
        )).toBe(1.5);
    });
});
