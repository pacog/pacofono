import * as React from "react";

import { ISong, ISongPart, IChord, INote } from "types";
import PButton from "components/PButton";
import PartEditorChordsSelector from "components/PartEditorChordsSelector";
import ChordEditor from "components/ChordEditor";
import "./style.scss";
import ConfirmDeletePart from "./confirmDeletePart";

interface ISongPartEditorProps {
    chords: IChord[];
    part: ISongPart;
    song: ISong;
    canBeDeleted: boolean;
    isShowingConfirmDeletePart: boolean;
    onPartNameChanged: (part: ISongPart, newValue: string) => void;
    onDeletePart: () => void;
    onCancelDeletePart: () => void;
    onConfirmDeletePart: (part: ISongPart, song: ISong) => void;
    onAddChord: () => void;
    selectedChord: IChord;
    onSelectChord: (chord: IChord) => void;
    onMoveChord: (chordId: string, partId: string, desiredIndex: number) => void;
    onChordNameChanged: (chord: IChord, newValue: string) => void;
    onToggleNote: (chord: IChord, note: INote) => void;
    onDeleteChord: (chord: IChord) => void;
    canSelectedChordBeDeleted: boolean;
}

const SongPartEditor: React.SFC<ISongPartEditorProps> = (props: ISongPartEditorProps) => (
    <div className="song-part-editor">
        {
            props.part &&
            <div className="line-center">
                <input
                    value={props.part.name}
                    className="p-input grow-full-width"
                    onChange={(e) => { props.onPartNameChanged(props.part, e.target.value); }} />
                {
                    props.canBeDeleted &&
                    <PButton
                        className="ml-m"
                        secondary={true}
                        onClick={props.onDeletePart }>
                            Delete part
                        </PButton>
                }
            </div>
        }
        {
            props.isShowingConfirmDeletePart &&
            <ConfirmDeletePart
                onCancelDeletePart={props.onCancelDeletePart}
                onConfirmDeletePart={ () => props.onConfirmDeletePart(props.part, props.song) }
                ></ConfirmDeletePart>
        }
        <PartEditorChordsSelector
            part={ props.part }
            onAddChord={ props.onAddChord }
            chords={ props.chords }
            onSelectChord={ props.onSelectChord }
            selectedChord={ props.selectedChord }
            onMoveChord={ props.onMoveChord }
            ></PartEditorChordsSelector>
        {
            props.selectedChord &&
            <ChordEditor
                part={ props.part }
                chord={ props.selectedChord }
                onChordNameChanged={ props.onChordNameChanged }
                onToggleNote={ props.onToggleNote }
                onDeleteChord={ props.onDeleteChord }
                canBeDeleted={ props.canSelectedChordBeDeleted }
                ></ChordEditor>
        }
    </div>
);

export default SongPartEditor;
