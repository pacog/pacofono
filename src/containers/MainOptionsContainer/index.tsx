import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";

import MainOptions from "components/MainOptions";
import { isSynthDebuggerShown } from "store/selectors/mainOptions";
import { actionCreators as modalActions } from "store/actions/mainOptions";

const mapStateToProps = (state: IRootState) => {
    return {
        isSynthDebuggerShown: isSynthDebuggerShown(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        setShowSynthDebugger: (show: boolean) => {
            dispatch(modalActions.setShowSynthDebugger(show));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainOptions);
