import * as React from "react";

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
    canBeDeleted: boolean;
    onToggleNote: (chord: IChord, note: INote) => void;
}

const ChordEditor: React.SFC<IChordEditorProps> = (props: IChordEditorProps) => (
    <div className="chord-editor mt-l">
        <div className="line-center mb-ml">
            <input
                value={props.chord.name}
                className="p-input grow-full-width"
                onChange={(e) => { props.onChordNameChanged(props.chord, e.target.value); } } />
            <div className="grow-full-width"></div>
            {
                props.canBeDeleted &&
                <PButton
                    onClick={() => { props.onDeleteChord(props.chord, props.part.id); }}
                    secondary={true}
                    >Delete chord</PButton>
            }
        </div>
        <NoteSelector
            allNotes={allNotesArray}
            selectedNotes={props.chord.notes}
            onToggleNote={ (note) => { props.onToggleNote(props.chord, note); }}
            ></NoteSelector>
    </div>
);

export default ChordEditor;
