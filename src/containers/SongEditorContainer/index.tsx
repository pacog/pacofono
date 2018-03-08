import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { IRootState } from "store/reducers/root";
import SongEditor from "components/SongEditor";
import { getSong } from "store/selectors/songEditor";

const mapStateToProps = (state: IRootState) => {
    return {
        song: getSong(state),
    };
};

// const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
//     return {
//         closeSongEditor: () => { dispatch(actionCreators.closeSongEditor()); },
//     };
// };
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor);
