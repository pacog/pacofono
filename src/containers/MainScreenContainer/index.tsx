import { connect } from "react-redux";
// import { RootAction } from "store/actions";
// import { ThunkDispatch } from "redux-thunk";

import {
    isSynthDebuggerShown,
    isAudioOutputShown,
} from "store/selectors/mainOptions";
import { IRootState } from "store/reducers/root";

import MainScreen from "components/MainScreen";

const mapStateToProps = (state: IRootState) => {
    return {
        showSynthsDebugger: isSynthDebuggerShown(state),
        showAudioOutput: isAudioOutputShown(state),
    };
};

const mapDispatchToProps = (/*dispatch: ThunkDispatch<IRootState, {}, RootAction>*/) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
