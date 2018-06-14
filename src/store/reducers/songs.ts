import { RootAction } from "store/actions";
import { ADD_SONG, CHANGE_SONG_NAME, DELETE_SONG, CHANGE_PART_INDEX } from "store/actions/songs";
import { ADD_PART, DELETE_PART } from "store/actions/parts";

import { ISong } from "types";

export interface ISongsState {
    readonly [id: string]: ISong;
}

const initialState: ISongsState = {};

export const songsReducer = (state: ISongsState = initialState, action: RootAction) => {
    switch (action.type) {
        case ADD_SONG:
            return {
                ...state,
                [action.song.id]: {...action.song},
            };
        case CHANGE_SONG_NAME:
            return {
                ...state,
                [action.song.id]: {...action.song, name: action.newName },
            };
        case DELETE_SONG:
            return {
                ...state,
                [action.song.id]: undefined,
            };

        case ADD_PART:
            const song = state[action.songId];
            if (!song) {
                return state;
            }
            const partsWithNewPart = song.parts.concat(action.part.id);
            return {
                ...state,
                [song.id]: {...song, parts: partsWithNewPart},
            };

        case DELETE_PART:
            const song2 = state[action.songId];
            if (!song2) {
                return state;
            }
            const partsWithoutPart = song2.parts.filter((partId) => partId !== action.part.id);
            return {
                ...state,
                [song2.id]: {...song2, parts: partsWithoutPart},
            };

        case CHANGE_PART_INDEX:
            const song3 = state[action.songId];
            if (!song3) {
                return state;
            }
            const partIndex = song3.parts.indexOf(action.partId);
            if ((partIndex === -1) || partIndex === action.desiredIndex) {
                return state;
            }
            const newParts = song3.parts.slice();
            newParts.splice(action.desiredIndex, 0, newParts.splice(partIndex, 1)[0]);
            return {
                ...state,
                [song3.id]: {...song3, parts: newParts},
            };
        default:
            return state;
    }
};
