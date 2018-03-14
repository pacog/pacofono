import { RootAction } from "store/actions";
import { SET_CURRENT_SONG } from "store/actions/currentSong";

export interface ICurrentSongsState {
    readonly id: string;
}

const initialState: ICurrentSongsState = {
    id: null,
};

export const currentSongReducer = (state: ICurrentSongsState = initialState, action: RootAction) => {
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
