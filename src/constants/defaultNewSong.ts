import * as uuid from "uuid/v1";
import { ISong } from "types";

// TODO get default empty part

export const getDefaultNewSong: (() => ISong) = () => {
    return {
        id: uuid(),
        name: "La cucaracha",
        parts: [],
    };
};
