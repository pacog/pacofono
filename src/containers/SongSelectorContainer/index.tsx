import { connect, Dispatch } from "react-redux";

import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";
import { getSongNames } from "store/selectors/songs";

const mapStateToProps = (state: IRootState) => {
    return {
        songNames: getSongNames(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onAddSongClick: () => {
            // TODO: add empty song to edit
            // TODO: open popup
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongSelector);
