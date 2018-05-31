import { connect, Dispatch } from "react-redux";

import { ISong, ISongPart } from "types";
import SongDetails from "components/SongDetails";
import { IRootState } from "store/reducers/root";
import { getCurrentSong } from "store/selectors/currentSong";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { actionCreators as currentSongPartActions } from "store/actions/currentSongPart";
import { duplicateSong } from "store/actions/songs";
import { getSongParts } from "store/selectors/parts";
import { getCurrentSongPart } from "store/selectors/currentSongPart";

const mapStateToProps = (state: IRootState) => {
    const song = getCurrentSong(state);
    let songParts = null;
    if (song) {
        songParts = getSongParts(state, song.id);
    }
    return {
        song,
        songParts,
        selectedPart: getCurrentSongPart(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onEditSong: (song: ISong) => {
            // TODO ugly fix for dispatch thunk actions type error (<any>)
            const duplicatedSong = dispatch<any>(duplicateSong(song));
            dispatch(modalsActions.openSongEditor());
            dispatch(songEditorActions.startEditingExistingSong(duplicatedSong, song));
        },
        onShowSongsSelector: () => {
            dispatch(currentSongActions.setCurrentSong(null));
        },
        onPartSelected: (part: ISongPart) => {
            dispatch(currentSongPartActions.setCurrentPart(part));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);
