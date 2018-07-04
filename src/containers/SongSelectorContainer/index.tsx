import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { Dispatch } from "redux";
import { ISong } from "types";
import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";
import { getSavedSongs } from "store/selectors/songs";
import { getCurrentSong } from "store/selectors/currentSong";
import { openForNewSong } from "store/actions/songEditor";
import { actionCreators as currentSongActions } from "store/actions/currentSong";

const mapStateToProps = (state: IRootState) => {
    return {
        songs: getSavedSongs(state),
        selectedSong: getCurrentSong(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
    return {
        onAddSongClick: () => {
            dispatch(openForNewSong() as any);
        },
        onSelectSong: (song: ISong) => {
            dispatch(currentSongActions.setCurrentSong(song));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
