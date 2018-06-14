import { connect, Dispatch } from "react-redux";

import { ISongPart } from "types";
import SongPartEditor from "components/SongPartEditor";
import { IRootState } from "store/reducers/root";
import { actionCreators as partsActions } from "store/actions/parts";
import { getPartBeingEdited, canPartBeDeleted } from "store/selectors/songEditor";

const mapStateToProps = (state: IRootState) => {
    const part = getPartBeingEdited(state);
    return {
        part,
        canBeDeleted: canPartBeDeleted(state, part),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onPartNameChanged: (part: ISongPart, newName: string) => {
            dispatch(partsActions.changePartName(part, newName));
        },
        onDeletePart: (part: ISongPart) => {
            console.log("deleting", part);
            // TODO: add async action that selects a different part then
            // calls cascade delete on the part
            // TODO: test that async action
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPartEditor);
