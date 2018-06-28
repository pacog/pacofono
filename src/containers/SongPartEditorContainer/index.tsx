import { connect, Dispatch } from "react-redux";

import { ISongPart, ISong, IChord } from "types";
import SongPartEditor from "components/SongPartEditor";
import { IRootState } from "store/reducers/root";
import { actionCreators as partsActions } from "store/actions/parts";
import {
    actionCreators as songEditorActions,
    deletePartAndSelectOther,
    addChordToPartBeingEdited,
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
        onAddChord: () => {
            dispatch(addChordToPartBeingEdited() as any);
        },
        onSelectChord: (chord: IChord) => {
            dispatch(songEditorActions.selectChordToEdit(chord.id));
        },
        onChordNameChanged: (chord: IChord, newName: string) => {
            dispatch(chordsActions.changeChordName(chord, newName));
        },
        onDeleteChord: (chord: IChord, partId: string) => {
            dispatch(chordsActions.deleteChord(chord, partId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongPartEditor);
