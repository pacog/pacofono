import { connect } from "react-redux";
import { RootAction } from "store/actions";
import { ThunkDispatch } from "redux-thunk";
import { ISongPart, ISong, IChord, INote } from "types";
import SongPartEditor from "components/SongPartEditor";
import { IRootState } from "store/reducers/root";
import { actionCreators as partsActions } from "store/actions/parts";
import {
    actionCreators as songEditorActions,
    deletePartAndSelectOther,
    addChordToPartBeingEdited,
    deleteChordAndSelectOther,
    duplicateAndEditPart,
} from "store/actions/songEditor";

import {
    getPartBeingEdited,
    canPartBeDeleted,
    getSong,
    isShowingConfirmDeletePart,
    getChordsFromPartBeingEdited,
    getChordBeingEdited,
    canSelectedChordBeDeleted,
} from "store/selectors/songEditor";
import { actionCreators as chordsActions } from "store/actions/chords";

const mapStateToProps = (state: IRootState) => {
    const part = getPartBeingEdited(state);
    return {
        chords: getChordsFromPartBeingEdited(state),
        song: getSong(state),
        part,
        canBeDeleted: part && canPartBeDeleted(state, part),
        isShowingConfirmDeletePart: isShowingConfirmDeletePart(state),
        selectedChord: getChordBeingEdited(state),
        canSelectedChordBeDeleted: canSelectedChordBeDeleted(state),
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, {}, RootAction>) => {
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
            dispatch(deletePartAndSelectOther(part, song));
        },
        onAddChord: () => {
            dispatch(addChordToPartBeingEdited());
        },
        onSelectChord: (chord: IChord) => {
            dispatch(songEditorActions.selectChordToEdit(chord.id));
        },
        onChordNameChanged: (chord: IChord, newName: string) => {
            dispatch(chordsActions.changeChordName(chord, newName));
        },
        onDeleteChord: (chord: IChord, partId: string) => {
            dispatch(deleteChordAndSelectOther(chord, partId));
        },
        onMoveChord: (chordId: string, partId: string, desiredIndex: number) => {
            dispatch(partsActions.changeChordIndex(partId, chordId, desiredIndex));
        },
        onToggleNote: (chord: IChord, note: INote) => {
            dispatch(chordsActions.toggleNote(chord, note.name));
        },
        onDuplicatePart: (part: ISongPart, song: ISong) => {
            dispatch(duplicateAndEditPart(part, song));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPartEditor);
