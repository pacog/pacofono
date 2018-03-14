import { connect, Dispatch } from "react-redux";

import { ISong } from "types";
import { getDefaultNewSong } from "constants/defaultNewSong";
import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";
import { getSavedSongs } from "store/selectors/songs";
import { getCurrentSong } from "store/selectors/currentSong";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as songsActions } from "store/actions/songs";
import { actionCreators as currentSongActions } from "store/actions/currentSong";

const mapStateToProps = (state: IRootState) => {
    return {
        songs: getSavedSongs(state),
        selectedSong: getCurrentSong(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onAddSongClick: () => {
            dispatch(modalsActions.openSongEditor());
            const newSong = getDefaultNewSong();
            dispatch(songsActions.addSong(newSong));
            dispatch(songEditorActions.startEditingNewSong(newSong));
        },
        onSelectSong: (song: ISong) => {
            dispatch(currentSongActions.setCurrentSong(song));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
