export const OPEN_SONG_EDITOR = "OPEN_SONG_EDITOR";
export const CLOSE_SONG_EDITOR = "CLOSE_SONG_EDITOR";

export interface IModalsActions {
    OPEN_SONG_EDITOR: {
        type: typeof OPEN_SONG_EDITOR,
    };
    CLOSE_SONG_EDITOR: {
        type: typeof CLOSE_SONG_EDITOR,
    };
}

export const actionCreators = {
    openSongEditor: (): IModalsActions[typeof OPEN_SONG_EDITOR] => ({
        type: OPEN_SONG_EDITOR,
    }),
    closeSongEditor: (): IModalsActions[typeof CLOSE_SONG_EDITOR] => ({
        type: CLOSE_SONG_EDITOR,
    }),
};
