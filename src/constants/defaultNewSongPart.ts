import { v1 as uuid } from "uuid";
import { ISongPart } from "types";

export const getDefaultNewSongPart: (() => ISongPart) = () => {
    return {
        id: uuid(),
        name: "Part 1",
        chords: [],
    };
};

export const getNameForPartWithoutName: (() => string) = () => {
    return "Unnamed Part";
};
