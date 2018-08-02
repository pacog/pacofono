import { getNoteBetween } from "utils/noteCalculator";

describe("noteCalculator", () => {
    it("shoud work just fine", () => {
        expect(getNoteBetween(220, 880, 0.5)).toBeCloseTo(440);
        expect(getNoteBetween(220, 880, 0)).toBeCloseTo(220);
        expect(getNoteBetween(55, 880, 0.5)).toBeCloseTo(220);
        expect(getNoteBetween(220, 880, 1)).toBeCloseTo(880);
        expect(getNoteBetween(110, 880, 1 / 3)).toBeCloseTo(220);
        expect(getNoteBetween(110, 880, 2 / 3)).toBeCloseTo(440);
    });
});
