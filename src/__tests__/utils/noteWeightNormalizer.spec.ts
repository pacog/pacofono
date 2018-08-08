import { normalizeNoteWeights } from "utils/noteWeightNormalizer";

describe("noteWeightNormalizer", () => {

    it("should work for normal cases", () => {
        const notes1 = [{
            frequency: 440,
            weight: 1,
        }, {
            frequency: 880,
            weight: 1,
        }];

        expect(normalizeNoteWeights(notes1)).toEqual([{
            frequency: 440,
            weight: 0.5,
        }, {
            frequency: 880,
            weight: 0.5,
        }]);

        const notes2 = [{
            frequency: 440,
            weight: 1,
        }, {
            frequency: 880,
            weight: 0,
        }];

        expect(normalizeNoteWeights(notes2)).toEqual([{
            frequency: 440,
            weight: 1,
        }, {
            frequency: 880,
            weight: 0,
        }]);

        const notes3 = [{
            frequency: 440,
            weight: 1,
        }, {
            frequency: 880,
            weight: 1,
        }, {
            frequency: 900,
            weight: 1,
        }];

        expect(normalizeNoteWeights(notes3)).toEqual([{
            frequency: 440,
            weight: 0.3333333333333333,
        }, {
            frequency: 880,
            weight: 0.3333333333333333,
        }, {
            frequency: 900,
            weight: 0.3333333333333333,
        }]);

        const notes4 = [{
            frequency: 440,
            weight: 1,
        }, {
            frequency: 880,
            weight: 1,
        }, {
            frequency: 900,
            weight: 0.5,
        }];

        expect(normalizeNoteWeights(notes4)).toEqual([{
            frequency: 440,
            weight: 0.4,
        }, {
            frequency: 880,
            weight: 0.4,
        }, {
            frequency: 900,
            weight: 0.2,
        }]);

    });

    it("should work for special cases", () => {
        const notes1 = [{
            frequency: 440,
            weight: 0,
        }, {
            frequency: 880,
            weight: 0,
        }];

        expect(normalizeNoteWeights(notes1)).toEqual([{
            frequency: 440,
            weight: 0,
        }, {
            frequency: 880,
            weight: 0,
        }]);

        const notes2: any = [];

        expect(normalizeNoteWeights(notes2)).toEqual([]);
    });

});
