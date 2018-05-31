import { RootAction } from "store/actions";
import { SET_CURRENT_SONG } from "store/actions/currentSong";

export interface ICurrentSongState {
    readonly id: string;
}

const initialState: ICurrentSongState = {
    id: null,
};

export const currentSongReducer = (state: ICurrentSongState = initialState, action: RootAction) => {
    switch (action.type) {
        case SET_CURRENT_SONG:
            if (action.song === null) {
                return { ...state, id: null };
            } else {
                return { ...state, id: action.song.id };
            }
        default:
            return state;
    }
};
