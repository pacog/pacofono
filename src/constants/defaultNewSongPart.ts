import * as uuid from "uuid/v1";
import { ISongPart } from "types";

export const getDefaultNewSongPart: (() => ISongPart) = () => {
    return {
        id: uuid(),
        name: "Part 1",
        chords: [],
    };
};
