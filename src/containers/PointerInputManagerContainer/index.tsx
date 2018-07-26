import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";
import { playChord } from "modules/chordPlayer";
import { IChord } from "types";
import { IRootState } from "store/reducers/root";
import { getCurrentChords } from "store/selectors/currentSongPart";
import PointerInputManager from "components/PointerInputManager";

const mapStateToProps = (state: IRootState) => {
    return {
        chords: getCurrentChords(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
    return {
        onPointStart: (chord: IChord) => {
            playChord(chord);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PointerInputManager);
