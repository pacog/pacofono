import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";
import { actionCreators as modalsActions } from "store/actions/modals";
import { IRootState } from "store/reducers/root";

import Header from "components/Header";

const mapStateToProps = (/*state: IRootState*/) => {
    return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onShowOptions: () => {
            dispatch(modalsActions.openMainOptions());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
