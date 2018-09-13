import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";
import { openForExistingSound } from "store/actions/soundEditor";
import CurrentSoundHUD from "components/CurrentSoundHUD";

const mapStateToProps = (state: IRootState) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onOpenEditor: () => {
            dispatch(openForExistingSound());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSoundHUD);
