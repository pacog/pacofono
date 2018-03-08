import { ISong } from "types";

export const START_EDITING_NEW_SONG = "START_EDITING_NEW_SONG";

export interface ISongEditorActions {
    START_EDITING_NEW_SONG: {
        type: typeof START_EDITING_NEW_SONG,
        song: ISong,
    };
}

export const actionCreators = {
    startEditingNewSong: (song: ISong): ISongEditorActions[typeof START_EDITING_NEW_SONG] => ({
        type: START_EDITING_NEW_SONG,
        song,
    }),
};
