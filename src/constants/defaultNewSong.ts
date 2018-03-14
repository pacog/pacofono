import * as uuid from "uuid/v1";
import { ISong } from "types";

export const getDefaultNewSong: (() => ISong) = () => {
    return {
        id: uuid(),
        name: "La cucaracha",
    };
};
