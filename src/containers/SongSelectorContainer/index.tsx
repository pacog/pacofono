import { connect, Dispatch } from "react-redux";

import { getDefaultNewSong } from "constants/defaultNewSong";
import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";
import { getSongNames } from "store/selectors/songs";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songEditorActions } from "store/actions/songEditor";
import { actionCreators as songsActions } from "store/actions/songs";

const mapStateToProps = (state: IRootState) => {
    return {
        songNames: getSongNames(state),
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
