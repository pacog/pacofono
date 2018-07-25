import { connect } from "react-redux";

import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";
import { ISong, ISongPart } from "types";
import { IRootState } from "store/reducers/root";
import SongEditor from "components/SongEditor";
import {
    getSong,
    isNewSong,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
    getPartBeingEdited,
} from "store/selectors/songEditor";
import { getSongParts } from "store/selectors/parts";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songsActions, cascadeDeleteSong } from "store/actions/songs";
import {
    actionCreators as songEditorActions,
    saveSongBeingEdited,
    restoreDefaults,
    deleteSongBeingEdited,
    saveEditedSongAsCopy,
    addAndEditPart,
    cascadeSelectPartToEdit,
} from "store/actions/songEditor";
import { actionCreators as currentSongActions } from "store/actions/currentSong";

const mapStateToProps = (state: IRootState) => {
    const song = getSong(state);
    return {
        song,
        parts: getSongParts(state, song ? song.id : null),
        selectedPart: getPartBeingEdited(state),
        isNewSong: isNewSong(state),
        isShowingConfirmRestoreDefaults: isShowingConfirmRestoreDefaults(state),
        isShowingConfirmDeleteSong: isShowingConfirmDeleteSong(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onSaveSong: () => {
            dispatch(saveSongBeingEdited())
                .then((savedSong: ISong) => {
                    dispatch(modalsActions.closeSongEditor());
                    dispatch(currentSongActions.setCurrentSong(savedSong));
                });
        },
        onSaveSongAsCopy: () => {
            dispatch(saveEditedSongAsCopy());
        },
        onClose: (song: ISong) => {
            dispatch(modalsActions.closeSongEditor());
            dispatch(cascadeDeleteSong(song)).then(() => {
                dispatch(songEditorActions.stopEditing());
            });
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
            dispatch(restoreDefaults());
            dispatch(songEditorActions.showConfirmRestoreDefaults(false));
        },
        onAddPart: (toSong: ISong) => {
            dispatch(addAndEditPart(toSong));
        },
        onDeleteSong: () => {
            dispatch(songEditorActions.showConfirmDeleteSong(true));
        },
        onCancelDeleteSong: () => {
            dispatch(songEditorActions.showConfirmDeleteSong(false));
        },
        onDeleteSongConfirm: () => {
            dispatch(deleteSongBeingEdited());
        },
        onSelectPart: (part: ISongPart) => {
            dispatch(cascadeSelectPartToEdit(part.id));
        },
        onMovePart: (songId: string, partId: string, desiredIndex: number) => {
            dispatch(songsActions.changePartIndex(songId, partId, desiredIndex));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor);
