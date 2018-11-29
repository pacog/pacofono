import { vectorToPointObject, getRatioWithinValues } from "modules/leapMotion/utils";

describe("leapMotion utils", () => {
    describe("vectorToPointObject", () => {
        it("should work", () => {
            expect(vectorToPointObject([1, 2, 4])).toEqual({
                x: 1,
                y: 2,
                z: 4,
            });
        });
    });

    describe("getRatioWithinValues", () => {
        it("should work for middle values", () => {
            expect(getRatioWithinValues(3, 1, 5)).toBe(0.5);
            expect(getRatioWithinValues(2, 1, 5)).toBe(0.25);
            expect(getRatioWithinValues(0, -2, 2)).toBe(0.5);
            expect(getRatioWithinValues(-1, -2, 2)).toBe(0.25);
        });

        it("should work for fringe values", () => {
            expect(getRatioWithinValues(1, 1, 5)).toBe(0);
            expect(getRatioWithinValues(5, 1, 5)).toBe(1);
            expect(getRatioWithinValues(-2, -2, 2)).toBe(0);
            expect(getRatioWithinValues(2, -2, 2)).toBe(1);
        });

        it("should work for outside values", () => {
            expect(getRatioWithinValues(-1, 1, 5)).toBe(0);
            expect(getRatioWithinValues(789, 1, 5)).toBe(1);
            expect(getRatioWithinValues(-22, -2, 2)).toBe(0);
            expect(getRatioWithinValues(241, -2, 2)).toBe(1);
        });
    });

});
