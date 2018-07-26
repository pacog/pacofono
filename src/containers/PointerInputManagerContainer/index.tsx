import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";
import { playChord, stopPlaying, changeVolume } from "modules/chordPlayer";
import { IChord, IPointRatio } from "types";
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
        onPointStart: (chord: IChord, where: IPointRatio) => {
            playChord(chord, where.y);
        },
        onPointerMove: (newPosition: IPointRatio) => {
            changeVolume(newPosition.y);
        },
        onPointEnd: () => {
            stopPlaying();
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PointerInputManager);
