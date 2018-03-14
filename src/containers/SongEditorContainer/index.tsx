import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { IRootState } from "store/reducers/root";
import SongEditor from "components/SongEditor";
import { getSong } from "store/selectors/songEditor";
import { actionCreators } from "store/actions/modals";

const mapStateToProps = (state: IRootState) => {
    return {
        song: getSong(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onSaveSong: () => { console.log("onSaveSong"); },
        onClose: () => { dispatch(actionCreators.closeSongEditor()); },
        onSongNameChanged: (newValue: string) => { console.log("new val", newValue); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor);
