import * as React from "react";

import { IChord } from "types";
// import PButton from "components/PButton";
// import PartEditorChordsSelector from "components/PartEditorChordsSelector";
// import ChordEditor from "components/ChordEditor";
import "./style.scss";
// import ConfirmDeletePart from "./confirmDeletePart";

interface IChordEditorProps {
    chord: IChord;
    onChordNameChanged: (chord: IChord, newValue: string) => void;
}

const ChordEditor: React.SFC<IChordEditorProps> = (props: IChordEditorProps) => (
    <div className="chord-editor mt-l">
        <input
            value={props.chord.name}
            className="p-input song-editor-name-input grow-full-width"
            onChange={(e) => { props.onChordNameChanged(props.chord, e.target.value); } } />
    </div>
);

export default ChordEditor;
