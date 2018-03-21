import { ISong } from "types";

export const START_EDITING_NEW_SONG = "START_EDITING_NEW_SONG";
export const STOP_EDITING = "STOP_EDITING";
export const START_EDITING_EXISTING_SONG = "START_EDITING_EXISTING_SONG";

export interface ISongEditorActions {
    START_EDITING_NEW_SONG: {
        type: typeof START_EDITING_NEW_SONG,
        song: ISong,
    };
    STOP_EDITING: {
        type: typeof STOP_EDITING,
    };
    START_EDITING_EXISTING_SONG: {
        type: typeof START_EDITING_EXISTING_SONG,
        song: ISong,
        originalSong: ISong,
    };
}

export const actionCreators = {
    startEditingNewSong: (song: ISong): ISongEditorActions[typeof START_EDITING_NEW_SONG] => ({
        type: START_EDITING_NEW_SONG,
        song,
    }),
    stopEditing: (): ISongEditorActions[typeof STOP_EDITING] => ({
        type: STOP_EDITING,
    }),
    startEditingExistingSong: (song: ISong, originalSong: ISong):
    ISongEditorActions[typeof START_EDITING_EXISTING_SONG] => ({
        type: START_EDITING_EXISTING_SONG,
        song,
        originalSong,
    }),
};
