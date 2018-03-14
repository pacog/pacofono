import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { ISong } from "types";
import { IRootState } from "store/reducers/root";
import SongEditor from "components/SongEditor";
import { getSong } from "store/selectors/songEditor";
import { actionCreators as modalsActions } from "store/actions/modals";
import { actionCreators as songsActions } from "store/actions/songs";

const mapStateToProps = (state: IRootState) => {
    return {
        song: getSong(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onSaveSong: () => { console.log("onSaveSong"); },
        onClose: () => {
            dispatch(modalsActions.closeSongEditor());
        },
        onSongNameChanged: (song: ISong, newName: string) => {
            dispatch(songsActions.changeSongName(song, newName));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor);
