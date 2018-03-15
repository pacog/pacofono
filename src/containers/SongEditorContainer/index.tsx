import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { ISong } from "types";
import { IRootState } from "store/reducers/root";
import SongEditor from "components/SongEditor";
import { getSong, isNewSong } from "store/selectors/songEditor";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songsActions } from "store/actions/songs";
import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as currentSongActions } from "store/actions/currentSong";

const mapStateToProps = (state: IRootState) => {
    return {
        song: getSong(state),
        isNewSong: isNewSong(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onSaveSong: (song: ISong) => {
            dispatch(modalsActions.closeSongEditor());
            dispatch(songEditorActions.stopEditing());
            dispatch(currentSongActions.setCurrentSong(song));
        },
        onClose: (song: ISong) => {
            dispatch(modalsActions.closeSongEditor());
            dispatch(songsActions.deleteSong(song));
            dispatch(songEditorActions.stopEditing());
        },
        onSongNameChanged: (song: ISong, newName: string) => {
            dispatch(songsActions.changeSongName(song, newName));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor);
