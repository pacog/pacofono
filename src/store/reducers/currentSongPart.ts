import { RootAction } from "store/actions";
import { SET_CURRENT_PART } from "store/actions/currentSongPart";
import { SET_CURRENT_SONG } from "store/actions/currentSong";

export interface ICurrentSongPartState {
    readonly id: string;
}

const initialState: ICurrentSongPartState = {
    id: null,
};

export const currentSongPartReducer = (state: ICurrentSongPartState = initialState, action: RootAction) => {
    switch (action.type) {
        case SET_CURRENT_PART:
            if (action.part === null) {
                return { ...state, id: null };
            } else {
                return { ...state, id: action.part.id };
            }
        case SET_CURRENT_SONG:
            if (action.song === null) {
                return { ...state, id: null };
            }
            if (state.id === null) { // No part was selected before
                return { ...state, id: action.song.parts[0] || null };
            }
            const isCurrentPartInSong = action.song.parts.filter((part) => part === state.id).length > 0;
            if (!isCurrentPartInSong) {
                return { ...state, id: action.song.parts[0] || null };
            }
            return state;
        default:
            return state;
    }
};
