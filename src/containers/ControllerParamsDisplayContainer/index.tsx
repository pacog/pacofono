import { connect } from "react-redux";
// import { RootAction } from "store/actions";
// import { ThunkDispatch } from "redux-thunk";

// import { IRootState } from "store/reducers/root";

import ControllerParamsDisplay from "components/ControllerParamsDisplay";

const mapStateToProps = (/* state: IRootState */) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch: ThunkDispatch<IRootState, {}, RootAction> */) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ControllerParamsDisplay);
