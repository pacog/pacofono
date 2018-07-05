import { Promise } from "es6-promise";
import { ISong } from "types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IRootState } from "store/reducers/root";
import { RootAction } from "store/actions";
import { v1 as uuid } from "uuid";
import { cascadeDeletePart, duplicatePart } from "./parts";
import { getPartById } from "store/selectors/parts";
import { getSong } from "store/selectors/songs";

export const ADD_SONG = "ADD_SONG";
export const DELETE_SONG = "DELETE_SONG";
export const CHANGE_SONG_NAME = "CHANGE_SONG_NAME";
export const CHANGE_PART_INDEX = "CHANGE_PART_INDEX";

export interface ISongsActions {
    ADD_SONG: {
        type: typeof ADD_SONG,
        song: ISong,
    };
    DELETE_SONG: {
        type: typeof DELETE_SONG,
        song: ISong,
    };
    CHANGE_SONG_NAME: {
        type: typeof CHANGE_SONG_NAME,
        song: ISong,
        newName: string,
    };
    CHANGE_PART_INDEX: {
        type: typeof CHANGE_PART_INDEX,
        songId: string,
        partId: string,
        desiredIndex: number,
    };
}

export const actionCreators = {
    addSong: (song: ISong): ISongsActions[typeof ADD_SONG] => ({
        type: ADD_SONG,
        song,
    }),
    deleteSong: (song: ISong): ISongsActions[typeof DELETE_SONG] => ({
        type: DELETE_SONG,
        song,
    }),
    changeSongName: (song: ISong, newName: string): ISongsActions[typeof CHANGE_SONG_NAME] => ({
        type: CHANGE_SONG_NAME,
        song,
        newName,
    }),
    changePartIndex: (songId: string, partId: string, desiredIndex: number):
    ISongsActions[typeof CHANGE_PART_INDEX] => ({
        type: CHANGE_PART_INDEX,
        songId,
        partId,
        desiredIndex,
    }),
};

export const duplicateSong = (song: ISong): ThunkAction<Promise<ISong>, IRootState, {}, RootAction> => {
    return (dispatch: ThunkDispatch<IRootState, {}, RootAction>, getState: () => IRootState): Promise<ISong> => {
        const newSongId = uuid();
        const newSong = {...song, id: newSongId, parts: ([] as string[])};
        dispatch(actionCreators.addSong(newSong));
        const addPartsPromises = song.parts
            .map((partId) => getPartById(getState(), partId))
            .map((part) => dispatch(duplicatePart(part, newSongId)));

        return Promise.all(addPartsPromises)
            .then(() => {
                return getSong(getState(), newSongId);
            });
    };
};

export const cascadeDeleteSong = (song: ISong): ThunkAction<Promise<ISong>, IRootState, {}, RootAction> => {
    return (dispatch: ThunkDispatch<IRootState, {}, RootAction>, getState: () => IRootState): Promise<ISong> => {
        const deleteAllPartsPromises = song.parts
            .map((partId) => getPartById(getState(), partId))
            .map((part) => dispatch(cascadeDeletePart(part, song.id)));

        return Promise.all(deleteAllPartsPromises)
            .then(() => {
                dispatch(actionCreators.deleteSong(song));
                return song;
            });
    };
};
