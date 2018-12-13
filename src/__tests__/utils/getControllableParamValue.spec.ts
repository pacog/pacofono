import { ControllerParams } from "types/index";
import {
    getControllableParamValue,
    transformWithControlPoints,
    applyParamRestrictions,
} from "modules/getControllableParamValue";

describe("getControllableParamValue", () => {

    const controllableParam1 = {
        name: "no-name",
        defaultValue: 6,
        controllerParam: ControllerParams.xRatio,
        inputTransformControlPoints: [0, 1],
    };

    it("should return the default value for no frame", () => {
        expect(getControllableParamValue(controllableParam1, null)).toBe(6);
    });

    it("should return the default value for basic frame", () => {
        expect(getControllableParamValue(controllableParam1, {
            timestamp: 12,
            [ControllerParams.xRatio]: 1,
            [ControllerParams.yRatio]: 1,
            [ControllerParams.zRatio]: 1,
            isPlaying: true,
        })).toBe(1);

        expect(getControllableParamValue(controllableParam1, {
            timestamp: 12,
            [ControllerParams.xRatio]: 0.5,
            [ControllerParams.yRatio]: 1,
            [ControllerParams.zRatio]: 1,
            isPlaying: true,
        })).toBe(0.5);
    });
});

describe("transformWithControlPoints", () => {

    it("should return correct values for simple linear control points", () => {
        const linearUp = [0, 1];
        expect(transformWithControlPoints(0.5, linearUp)).toBe(0.5);
        expect(transformWithControlPoints(0, linearUp)).toBe(0);
        expect(transformWithControlPoints(1, linearUp)).toBe(1);
        expect(transformWithControlPoints(-1, linearUp)).toBe(0);
        expect(transformWithControlPoints(1.1, linearUp)).toBe(1);

        const linearDown = [1, 0];
        expect(transformWithControlPoints(0.5, linearDown)).toBe(0.5);
        expect(transformWithControlPoints(1, linearDown)).toBe(0);
        expect(transformWithControlPoints(0, linearDown)).toBe(1);
        expect(transformWithControlPoints(1.1, linearDown)).toBe(0);
        expect(transformWithControlPoints(-1, linearDown)).toBe(1);
    });

    it("should return correct values for control points with more than two points", () => {
        const manyPoints1 = [0, 0, 1];
        expect(transformWithControlPoints(0, manyPoints1)).toBe(0);
        expect(transformWithControlPoints(1, manyPoints1)).toBe(1);
        expect(transformWithControlPoints(0.5, manyPoints1)).toBe(0);
        expect(transformWithControlPoints(0.75, manyPoints1)).toBe(0.5);
        expect(transformWithControlPoints(-1, manyPoints1)).toBe(0);
        expect(transformWithControlPoints(1.1, manyPoints1)).toBe(1);

        const manyPoints2 = [0, 0, 0.5, 1, 0, 0];
        expect(transformWithControlPoints(0, manyPoints2)).toBe(0);
        expect(transformWithControlPoints(0.2, manyPoints2)).toBe(0);
        expect(transformWithControlPoints(0.3, manyPoints2)).toBeCloseTo(0.25);
        expect(transformWithControlPoints(0.4, manyPoints2)).toBeCloseTo(0.5);
        expect(transformWithControlPoints(0.5, manyPoints2)).toBeCloseTo(0.75);
        expect(transformWithControlPoints(0.6, manyPoints2)).toBeCloseTo(1);
        expect(transformWithControlPoints(0.7, manyPoints2)).toBeCloseTo(0.5);
        expect(transformWithControlPoints(0.8, manyPoints2)).toBe(0);
        expect(transformWithControlPoints(-1, manyPoints2)).toBe(0);
        expect(transformWithControlPoints(1.1, manyPoints2)).toBe(0);
    });

    it("should return correct values for constant control points", () => {
        const constantControlPoints = [0.33, 0.33, 0.33];
        expect(transformWithControlPoints(0.5, constantControlPoints)).toBeCloseTo(0.33);
        expect(transformWithControlPoints(0.47, constantControlPoints)).toBeCloseTo(0.33);
        expect(transformWithControlPoints(1, constantControlPoints)).toBeCloseTo(0.33);
        expect(transformWithControlPoints(0, constantControlPoints)).toBeCloseTo(0.33);
        expect(transformWithControlPoints(1.1, constantControlPoints)).toBeCloseTo(0.33);
        expect(transformWithControlPoints(-1, constantControlPoints)).toBeCloseTo(0.33);
    });

    it("should return correct values for only one control point", () => {
        expect(transformWithControlPoints(0.5, [0.66])).toBe(0.66);
        expect(transformWithControlPoints(1, [0.66])).toBe(0.66);
        expect(transformWithControlPoints(0, [0.66])).toBe(0.66);
        expect(transformWithControlPoints(-1, [0.66])).toBe(0.66);
        expect(transformWithControlPoints(1.1, [0.66])).toBe(0.66);
    });

    it("should return correct values for no control point", () => {
        expect(transformWithControlPoints(0.5, null)).toBe(0.5);
        expect(transformWithControlPoints(1, null)).toBe(1);
        expect(transformWithControlPoints(0, null)).toBe(0);
        expect(transformWithControlPoints(-1, null)).toBe(0);
        expect(transformWithControlPoints(2, null)).toBe(1);
    });
});

describe("applyParamRestrictions", () => {
    it("should work for normal cases", () => {
        const basicRestriction = {
            min: -1,
            max: 1,
        };
        expect(applyParamRestrictions(0.5, basicRestriction)).toBe(0);
        expect(applyParamRestrictions(0, basicRestriction)).toBe(-1);
        expect(applyParamRestrictions(1, basicRestriction)).toBe(1);
    });

    it("should work for cases with steps", () => {
        const restrictionWithSteps = {
            min: -1,
            max: 1,
            step: 0.5,
        };
        expect(applyParamRestrictions(0, restrictionWithSteps)).toBe(-1);
        expect(applyParamRestrictions(0.1, restrictionWithSteps)).toBe(-1);
        expect(applyParamRestrictions(1, restrictionWithSteps)).toBe(1);
        expect(applyParamRestrictions(0.9, restrictionWithSteps)).toBe(1);

        expect(applyParamRestrictions(0.5, restrictionWithSteps)).toBe(0);
        expect(applyParamRestrictions(0.45, restrictionWithSteps)).toBe(0);
        expect(applyParamRestrictions(0.55, restrictionWithSteps)).toBe(0);
    });

    it("should work for no restrictions", () => {
        expect(applyParamRestrictions(0.3, null)).toBe(0.3);
        expect(applyParamRestrictions(0, null)).toBe(0);
        expect(applyParamRestrictions(1, null)).toBe(1);
    });
});
