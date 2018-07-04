import { connect } from "react-redux";
import { RootAction } from "store/actions";

import { ThunkDispatch } from "redux-thunk";
import { ISong, ISongPart } from "types";
import SongDetails from "components/SongDetails";
import { IRootState } from "store/reducers/root";
import { getCurrentSong } from "store/selectors/currentSong";
import { openForExistingSong } from "store/actions/songEditor";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { actionCreators as currentSongPartActions } from "store/actions/currentSongPart";
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

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onEditSong: (song: ISong) => {
            dispatch(openForExistingSong(song));
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
