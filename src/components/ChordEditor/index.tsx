import * as React from "react";

import { ActionSelector, ActionItem } from "components/ActionSelector";
import { IChord, ISongPart, INote } from "types";
import PButton from "components/PButton";
import NoteSelector from "components/NoteSelector";
import "./style.scss";
import { allNotesArray } from "constants/notes";

interface IChordEditorProps {
    part: ISongPart;
    chord: IChord;
    onChordNameChanged: (chord: IChord, newValue: string) => void;
    onDeleteChord: (chord: IChord, partId: string) => void;
    onDuplicateChord: (chord: IChord, part: ISongPart) => void;
    canBeDeleted: boolean;
    onToggleNote: (chord: IChord, note: INote) => void;
}

const ChordEditor: React.SFC<IChordEditorProps> = (props: IChordEditorProps) => (
    <div className="chord-editor mt-sm">
        <div className="line-bottom mb-ml">
            <div>
                <div className="p-label">Chord name</div>
                <input
                    value={props.chord.name}
                    className="p-input grow-full-width"
                    onChange={(e) => { props.onChordNameChanged(props.chord, e.target.value); } } />
            </div>
            <div className="grow-full-width"></div>
            {
                props.canBeDeleted &&
                <PButton
                    className="mr-sm"
                    onClick={() => { props.onDeleteChord(props.chord, props.part.id); }}
                    secondary={true}
                    >Delete chord</PButton>
            }
            <ActionSelector
                label="Chord actions"
                >
                <ActionItem
                    label="Duplicate chord"
                    onClick={ () => { props.onDuplicateChord(props.chord, props.part); } }
                    ></ActionItem>
                <ActionItem
                    label="Load from library (future)"
                    onClick={ () => { console.log("Load from library (future)"); } }
                    ></ActionItem>
                <ActionItem
                    label="Save in library (future)"
                    onClick={ () => { console.log("Save in library (future)"); } }
                    ></ActionItem>
                <ActionItem
                    label="Open in chord editor (future)"
                    onClick={ () => { console.log("Open in chord editor (future)"); } }
                    ></ActionItem>
            </ActionSelector>
        </div>
        <div className="chord-editor-note-selector-container">
            <NoteSelector
                allNotes={allNotesArray}
                selectedNotes={props.chord.notes}
                onToggleNote={ (note) => { props.onToggleNote(props.chord, note); }}
                ></NoteSelector>
        </div>
    </div>
);

export default ChordEditor;
