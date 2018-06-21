import { connect, Dispatch } from "react-redux";

import { ISongPart, ISong } from "types";
import SongPartEditor from "components/SongPartEditor";
import { IRootState } from "store/reducers/root";
import { actionCreators as partsActions } from "store/actions/parts";
import { actionCreators as songEditorActions, deletePartAndSelectOther } from "store/actions/songEditor";
import { getPartBeingEdited, canPartBeDeleted, getSong, isShowingConfirmDeletePart } from "store/selectors/songEditor";

const mapStateToProps = (state: IRootState) => {
    const part = getPartBeingEdited(state);
    return {
        song: getSong(state),
        part,
        canBeDeleted: part && canPartBeDeleted(state, part),
        isShowingConfirmDeletePart: isShowingConfirmDeletePart(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onPartNameChanged: (part: ISongPart, newName: string) => {
            dispatch(partsActions.changePartName(part, newName));
        },
        onDeletePart: () => {
            dispatch(songEditorActions.showConfirmDeletePart(true));
        },
        onCancelDeletePart: () => {
            dispatch(songEditorActions.showConfirmDeletePart(false));
        },
        onConfirmDeletePart: (part: ISongPart, song: ISong) => {
            dispatch(deletePartAndSelectOther(part, song) as any);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPartEditor);
