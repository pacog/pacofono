import { connect, Dispatch } from "react-redux";

import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";
import { getSongNames } from "store/selectors/songs";
import { actionCreators } from "store/actions/modals";

const mapStateToProps = (state: IRootState) => {
    return {
        songNames: getSongNames(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onAddSongClick: () => {
            dispatch(actionCreators.openSongEditor());
            // TODO: add empty song to edit
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
