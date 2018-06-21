import { v1 as uuid } from "uuid";
import { IChord } from "types";

export const getDefaultNewChord: (() => IChord) = () => {
    return {
        id: uuid(),
        name: "New chord",
        notes: [],
    };
};
