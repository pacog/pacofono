import isAttrEqual from "utils/isAttrEqual";

describe("isAttrEqual", () => {
    it("shoud work just fine", () => {
        const params1 = {
            bool1: true,
            bool2: true,
            int1: 12,
            int2: 13,
            nil1: null as any,
            nil2: null as any,
            obj1: { paco: true },
            obj2: { paco: true },
        };
        const params2 = {
            bool1: true,
            bool2: false,
            int1: 12,
            int2: 42,
            nil1: null as any,
            nil2: 5,
            obj1: { paco: true },
            obj2: { paco: false },
        };
        expect(isAttrEqual(params1, params2, "bool1")).toBe(true);
        expect(isAttrEqual(params1, params2, "bool2")).toBe(false);
        expect(isAttrEqual(params1, params2, "int1")).toBe(true);
        expect(isAttrEqual(params1, params2, "int2")).toBe(false);
        expect(isAttrEqual(params1, params2, "nil1")).toBe(true);
        expect(isAttrEqual(params1, params2, "nil2")).toBe(false);
        expect(isAttrEqual(params1, params2, "obj1")).toBe(true);
        expect(isAttrEqual(params1, params2, "obj2")).toBe(false);
    });
});
