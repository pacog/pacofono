import { IRootState } from "store/reducers/root";
import { getSong } from "store/selectors/songs";
import { ISongPart } from "types";

export const getPartById = (state: IRootState, partId: string): ISongPart => {
    return state.parts[partId];
};

export const getSongParts = (state: IRootState, songId: string): ISongPart[] => {
    const song = getSong(state, songId);
    if (!song) {
        throw new Error("Trying to get parts of a non existing song");
    }
    return song.parts.map((partId) => getPartById(state, partId));
};
