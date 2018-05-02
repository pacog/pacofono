import { connect, Dispatch } from "react-redux";

import { ISong } from "types";
import { IRootState } from "store/reducers/root";
import SongEditor from "components/SongEditor";
import {
    getSong,
    isNewSong,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
} from "store/selectors/songEditor";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songsActions } from "store/actions/songs";
import {
    actionCreators as songEditorActions,
    saveSongBeingEdited,
    restoreDefaults,
    deleteSongBeingEdited,
} from "store/actions/songEditor";
import { actionCreators as currentSongActions } from "store/actions/currentSong";

const mapStateToProps = (state: IRootState) => {
    return {
        song: getSong(state),
        isNewSong: isNewSong(state),
        isShowingConfirmRestoreDefaults: isShowingConfirmRestoreDefaults(state),
        isShowingConfirmDeleteSong: isShowingConfirmDeleteSong(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onSaveSong: () => {
            // TODO ugly fix for dispatch thunk actions type error (<any>)
            const savedSong = dispatch<any>(saveSongBeingEdited());
            dispatch(modalsActions.closeSongEditor());
            dispatch(currentSongActions.setCurrentSong(savedSong));
        },
        onClose: (song: ISong) => {
            dispatch(modalsActions.closeSongEditor());
            dispatch(songsActions.deleteSong(song));
            dispatch(songEditorActions.stopEditing());
        },
        onSongNameChanged: (song: ISong, newName: string) => {
            dispatch(songsActions.changeSongName(song, newName));
        },
        onRestoreDefaults: () => {
            dispatch(songEditorActions.showConfirmRestoreDefaults(true));
        },
        onCancelRestoreDefaults: () => {
            dispatch(songEditorActions.showConfirmRestoreDefaults(false));
        },
        onRestoreDefaultsConfirm: () => {
            // TODO ugly fix for dispatch thunk actions type error (<any>)
            dispatch<any>(restoreDefaults());
            dispatch(songEditorActions.showConfirmRestoreDefaults(false));
        },
        onDeleteSong: () => {
            dispatch(songEditorActions.showConfirmDeleteSong(true));
        },
        onCancelDeleteSong: () => {
            dispatch(songEditorActions.showConfirmDeleteSong(false));
        },
        onDeleteSongConfirm: () => {
            dispatch<any>(deleteSongBeingEdited());
            dispatch(songEditorActions.showConfirmDeleteSong(false));
            dispatch(modalsActions.closeSongEditor());
            dispatch(songEditorActions.stopEditing());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor);
