const checkEquals = (value1: any, value2: any) => {
    if (typeof value1 !== typeof value2) {
        return false;
    }
    if (typeof value1 === "object") {
        return JSON.stringify(value1) === JSON.stringify(value2);
    }
    return value1 === value2;
};

const isAttrEqual = (params1: any, params2: any, attrName: string): boolean => {
    return checkEquals(params1[attrName], params2[attrName]);
};

export default isAttrEqual;
