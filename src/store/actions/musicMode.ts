export const CHANGE_MUSIC_MODE = "CHANGE_MUSIC_MODE";

export interface IMusicModeActions {
    CHANGE_MUSIC_MODE: {
        type: typeof CHANGE_MUSIC_MODE,
    };
}

export const actionCreators = {
    changeMusicMode: (): IMusicModeActions[typeof CHANGE_MUSIC_MODE] => ({
        type: CHANGE_MUSIC_MODE,
    }),
};
