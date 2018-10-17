import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";

import { IRootState } from "store/reducers/root";
import { getCurrentSound } from "store/selectors/currentSound";
import { actionCreators } from "store/actions/sounds";
import SoundEditor from "components/SoundEditor";
import { SynthTypes, ISound } from "types";

const mapStateToProps = (state: IRootState) => {
    return {
        sound: getCurrentSound(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onSynthTypeSelected: (sound: ISound, newSynthType: SynthTypes) => {
            dispatch(actionCreators.changeSynthType(sound, newSynthType));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundEditor);
