import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";
import { getVolume, isMuted } from "store/selectors/mainVolume";
import { actionCreators } from "store/actions/mainVolume";
import MainVolume from "components/MainVolume";

const mapStateToProps = (state: IRootState) => {
    return {
        volume: getVolume(state),
        mute: isMuted(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onVolumeChanged: (volume: number) => {
            dispatch(actionCreators.setVolume(volume));
        },
        onMuteChanged: (mute: boolean) => {
            dispatch(actionCreators.setMute(mute));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainVolume);
