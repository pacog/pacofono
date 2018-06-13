import { connect, Dispatch } from "react-redux";

import { ISongPart } from "types";
import SongPartEditor from "components/SongPartEditor";
import { IRootState } from "store/reducers/root";
import { actionCreators as partsActions } from "store/actions/parts";
import { getPartBeingEdited } from "store/selectors/songEditor";

const mapStateToProps = (state: IRootState) => {
    return {
        part: getPartBeingEdited(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        onPartNameChanged: (part: ISongPart, newName: string) => {
            dispatch(partsActions.changePartName(part, newName));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPartEditor);
