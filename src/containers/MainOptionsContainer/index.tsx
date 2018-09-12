import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";

import MainOptions from "components/MainOptions";
import {
    isSynthDebuggerShown,
    isAudioOutputShown,
} from "store/selectors/mainOptions";
import { actionCreators as mainOptionsActions } from "store/actions/mainOptions";

const mapStateToProps = (state: IRootState) => {
    return {
        isSynthDebuggerShown: isSynthDebuggerShown(state),
        isAudioOutputShown: isAudioOutputShown(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        setShowSynthDebugger: (show: boolean) => {
            dispatch(mainOptionsActions.setShowSynthDebugger(show));
        },

        setShowAudioOutput: (show: boolean) => {
            dispatch(mainOptionsActions.setShowAudioOutput(show));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainOptions);
