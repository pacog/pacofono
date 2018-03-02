import { connect } from "react-redux";

import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";
import { getSongNames } from "store/selectors/songs";

const mapStateToProps = (state: IRootState) => {
    return {
        songNames: getSongNames(state),
    };
};

export default connect(mapStateToProps, {})(SongSelector);
