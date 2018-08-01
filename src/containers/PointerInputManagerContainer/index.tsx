import { connect } from "react-redux";
// import { RootAction } from "store/actions";
// import { ThunkDispatch } from "redux-thunk";
import { IPointRatio } from "types";
import { IRootState } from "store/reducers/root";
import { pointerStartObservable, pointerMoveObservable, pointerEndObservable } from "modules/inputManager";
import { getCurrentChords } from "store/selectors/currentSongPart";
import PointerInputManager from "components/PointerInputManager";

const mapStateToProps = (state: IRootState) => {
    return {
        chords: getCurrentChords(state),
    };
};

const mapDispatchToProps = (/*dispatch: ThunkDispatch<IRootState, {}, RootAction>*/) => {
    return {
        onPointStart: (where: IPointRatio) => {
            pointerStartObservable.notify(where);
        },
        onPointerMove: (where: IPointRatio) => {
            pointerMoveObservable.notify(where);
        },
        onPointEnd: () => {
            pointerEndObservable.notify(true);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PointerInputManager);
