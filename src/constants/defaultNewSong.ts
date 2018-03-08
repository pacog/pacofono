import { ISong } from "types";

export const getDefaultNewSong: (() => ISong) = () => {
    return {
        id: "5",
        name: "La cucaracha",
    };
};
