export const OPEN_SONG_EDITOR = "OPEN_SONG_EDITOR";
export const CLOSE_SONG_EDITOR = "CLOSE_SONG_EDITOR";
export const OPEN_MAIN_OPTIONS = "OPEN_MAIN_OPTIONS";
export const CLOSE_MAIN_OPTIONS = "CLOSE_MAIN_OPTIONS";

export interface IModalsActions {
    OPEN_SONG_EDITOR: {
        type: typeof OPEN_SONG_EDITOR,
    };
    CLOSE_SONG_EDITOR: {
        type: typeof CLOSE_SONG_EDITOR,
    };
    OPEN_MAIN_OPTIONS: {
        type: typeof OPEN_MAIN_OPTIONS,
    };
    CLOSE_MAIN_OPTIONS: {
        type: typeof CLOSE_MAIN_OPTIONS,
    };
}

export const actionCreators = {
    openSongEditor: (): IModalsActions[typeof OPEN_SONG_EDITOR] => ({
        type: OPEN_SONG_EDITOR,
    }),
    closeSongEditor: (): IModalsActions[typeof CLOSE_SONG_EDITOR] => ({
        type: CLOSE_SONG_EDITOR,
    }),
    openMainOptions: (): IModalsActions[typeof OPEN_MAIN_OPTIONS] => ({
        type: OPEN_MAIN_OPTIONS,
    }),
    closeMainOptions: (): IModalsActions[typeof CLOSE_MAIN_OPTIONS] => ({
        type: CLOSE_MAIN_OPTIONS,
    }),
};
