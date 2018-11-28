import { connect } from "react-redux";

import { IRootState } from "store/reducers/root";

import LeapMotionStatus from "components/LeapMotionStatus";
import {
    isFocused,
    isConnected,
} from "store/selectors/leapMotionState";

const mapStateToProps = (state: IRootState) => {
    return {
        isFocused: isFocused(state),
        isConnected: isConnected(state),
    };
};

const mapDispatchToProps = (/* dispatch: ThunkDispatch<IRootState, {}, RootAction> */) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeapMotionStatus);
