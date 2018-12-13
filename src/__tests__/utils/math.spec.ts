import { clamp, projectValueToRange, snapToClosestStep } from "utils/math";

describe("clamp", () => {

    it("should do it well with params", () => {
        expect(clamp(2, 1, 3)).toBe(2);
        expect(clamp(1, 1, 3)).toBe(1);
        expect(clamp(3, 1, 3)).toBe(3);
        expect(clamp(0, 1, 3)).toBe(1);
        expect(clamp(65, 1, 3)).toBe(3);
    });

    it("should do it well without params", () => {
        expect(clamp(0.5)).toBe(0.5);
        expect(clamp(0)).toBe(0);
        expect(clamp(1)).toBe(1);
        expect(clamp(-43)).toBe(0);
        expect(clamp(65)).toBe(1);
    });
});


describe("projectValueToRange", () => {
    it("should work just fine", () => {
        expect(projectValueToRange({
            value: 1,
            originRange: [0, 2],
            destinationRange: [2, 4],
        })).toBe(3);

        expect(projectValueToRange({
            value: 2,
            originRange: [0, 2],
            destinationRange: [2, 4],
        })).toBe(4);

        expect(projectValueToRange({
            value: -2,
            originRange: [0, 2],
            destinationRange: [2, 4],
        })).toBe(0);
    });
});

describe("snapToClosestStep", () => {
    expect(snapToClosestStep({
        value: 0.1,
        stepSize: 1,
        rangeBegin: 0,
    })).toBe(0);

    expect(snapToClosestStep({
        value: 0.6,
        stepSize: 1,
        rangeBegin: 0,
    })).toBe(1);

    expect(snapToClosestStep({
        value: 0.6,
        stepSize: 1,
        rangeBegin: 0.5,
    })).toBe(0.5);
});

