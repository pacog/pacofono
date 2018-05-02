export const OPEN_SONG_SELECTOR = "OPEN_SONG_SELECTOR";
export const CLOSE_SONG_SELECTOR = "CLOSE_SONG_SELECTOR";

export interface ISongSelectorActions {
    OPEN_SONG_SELECTOR: {
        type: typeof OPEN_SONG_SELECTOR,
    };
    CLOSE_SONG_SELECTOR: {
        type: typeof CLOSE_SONG_SELECTOR,
    };
}

export const actionCreators = {
    open: (): ISongSelectorActions[typeof OPEN_SONG_SELECTOR] => ({
        type: OPEN_SONG_SELECTOR,
    }),
    close: (): ISongSelectorActions[typeof CLOSE_SONG_SELECTOR] => ({
        type: CLOSE_SONG_SELECTOR,
    }),
};
