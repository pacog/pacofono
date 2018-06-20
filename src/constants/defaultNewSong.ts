import { v1 as uuid } from "uuid";
import { ISong } from "types";

export const getDefaultNewSong: (() => ISong) = () => {
    return {
        id: uuid(),
        name: "La cucaracha",
        parts: [],
    };
};
