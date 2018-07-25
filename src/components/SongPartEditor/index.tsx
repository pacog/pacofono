import * as React from "react";

import { ISong, ISongPart, IChord, INote } from "types";
import PButton from "components/PButton";
import PartEditorChordsSelector from "components/PartEditorChordsSelector";
import ChordEditor from "components/ChordEditor";
import { ActionSelector, ActionItem } from "components/ActionSelector";
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
    onDuplicatePart: (part: ISongPart, song: ISong) => void;
    onCancelDeletePart: () => void;
    onConfirmDeletePart: (part: ISongPart, song: ISong) => void;
    onAddChord: () => void;
    selectedChord: IChord;
    onSelectChord: (chord: IChord) => void;
    onMoveChord: (chordId: string, partId: string, desiredIndex: number) => void;
    onChordNameChanged: (chord: IChord, newValue: string) => void;
    onToggleNote: (chord: IChord, note: INote) => void;
    onDeleteChord: (chord: IChord) => void;
    onDuplicateChord: (chord: IChord, part: ISongPart) => void;
    canSelectedChordBeDeleted: boolean;
}

const SongPartEditor: React.SFC<ISongPartEditorProps> = (props: ISongPartEditorProps) => (
    <div className="song-part-editor">
        {
            props.part &&
            <div className="line-bottom">
                <div>
                    <div className="p-label">Part name</div>
                    <input
                        value={props.part.name}
                        className="p-input"
                        onChange={(e) => { props.onPartNameChanged(props.part, e.target.value); }} />
                </div>
                <div className="grow-full-width"></div>

                <PButton
                    className="ml-m mr-sm"
                    secondary={true}
                    onClick={props.onAddChord }>
                        Add chord
                    </PButton>

                    <ActionSelector
                        label="Part actions"
                        >
                        <ActionItem
                            label="Duplicate part"
                            onClick={ () => props.onDuplicatePart(props.part, props.song) }
                            ></ActionItem>
                        <ActionItem
                            label="Create from scale (Future)"
                            onClick={ () => { console.log("Create from scale"); } }
                            ></ActionItem>
                        {
                            props.canBeDeleted &&
                            <ActionItem
                                label="Delete part"
                                onClick={ props.onDeletePart }
                                ></ActionItem>
                        }
                    </ActionSelector>

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
                onDuplicateChord={ props.onDuplicateChord }
                canBeDeleted={ props.canSelectedChordBeDeleted }
                ></ChordEditor>
        }
    </div>
);

export default SongPartEditor;
