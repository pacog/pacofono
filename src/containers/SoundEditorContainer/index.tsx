import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";

import SoundEditor from "components/SoundEditor";

const mapStateToProps = (state: IRootState) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onAction: () => {
            // dispatch(otherAction());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundEditor);
