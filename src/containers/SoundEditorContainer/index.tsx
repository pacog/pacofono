import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";
import { getCurrentSound } from "store/selectors/currentSound";
import synthTypes from "constants/synthTypes";
import SoundEditor from "components/SoundEditor";
import { SynthTypes } from "types";

const mapStateToProps = (state: IRootState) => {
    return {
        synthTypes,
        sound: getCurrentSound(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onSynthTypeSelected: (newSynthType: SynthTypes) => {
            // dispatch(otherAction());
            console.log("onSynthTypeSelected", newSynthType);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundEditor);
