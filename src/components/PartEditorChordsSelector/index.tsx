import * as React from "react";
import { IChord } from "types";
import PButton from "components/PButton";

import "./style.scss";

interface IPartEditorChordsSelectorProps {
    chords: IChord[];
    // selectedChord: IChord;
    onAddChord: () => void;
    // onSelectChord: (chord: IChord) => void;
    // onMoveChord: (chordId: string, desiredIndex: number) => void;
}
// +
// ((props.selectedChord === chord) ? "chords-selector-chord-selected" : "")
const PartEditorChordsSelector: React.SFC<IPartEditorChordsSelectorProps> = (props: IPartEditorChordsSelectorProps) => (
    <React.Fragment>
        <div className="selector-title chords-selector-title mt-l">Chords</div>
        <ul className="chords-selector-list">
            {props.chords.map( (chord, index) => (
                <li key={chord.id}
                    className={
                        "chords-selector-chord "
                    }
                    // onClick={
                    //    () => { props.onPartSelected(part); }
                    // }
                    >
                    <div className="chords-selector-chord-name">
                        { chord.name || getNameForChordWithoutName(index) }
                    </div>
                </li>
            ))}
        </ul>

        <PButton
            className="mt-m"
            secondary={true}
            fullWidth={true}
            onClick={props.onAddChord}>
            Add chord</PButton>

    </React.Fragment>
);

function getNameForChordWithoutName(chordIndex: number) {
    return `Chord ${chordIndex + 1}`;
}

export default PartEditorChordsSelector;
