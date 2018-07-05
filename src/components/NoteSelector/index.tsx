import * as React from "react";
import { INote } from "types";
import * as classnames from "classnames";

import "./style.scss";

interface INoteSelectorProps {
    allNotes: INote[];
    selectedNotes: string[];
    onToggleNote: (note: INote) => void;
}

const NoteSelector: React.SFC<INoteSelectorProps> = (props: INoteSelectorProps) => (
    <div className="note-selector">
        {props.allNotes.map((note) => (
            <div key={note.name}
                onClick={() => { props.onToggleNote(note); }}
                className={ classnames({
                    "note-selector-note": true,
                    "note-selector-note-sharp": !!note.sharp,
                    "note-selector-note-selected": isNoteSelected(note, props.selectedNotes),
                }) }></div>
        ))}
    </div>
);

function isNoteSelected(note: INote, selectedNotes: string[]): boolean {
    return !!selectedNotes.find((selectedNote) => {
        return note.name === selectedNote;
    });
}

export default NoteSelector;
