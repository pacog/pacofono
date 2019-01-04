export const responseFunctions = new Map<string, number[]>();

responseFunctions.set("Linear up", [0, 1]);
responseFunctions.set("Linear down", [1, 0]);
responseFunctions.set("Linear plateau up", [0, 0, 1, 1]);
responseFunctions.set("Linear plateau down", [1, 1, 0, 0]);

export const getNameFor = (responseFunction: number[]): string => {
    const found = Array.from(responseFunctions.entries()).find((eachResponse) => {
        return JSON.stringify(eachResponse[1]) === JSON.stringify(responseFunction);
    });
    if (found) {
        return found[0];
    }
    return "Unknown response function";
};
