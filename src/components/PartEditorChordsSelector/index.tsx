import * as React from "react";
import { IChord } from "types";
import PButton from "components/PButton";

import "./style.scss";

interface IPartEditorChordsSelectorProps {
    chords: IChord[];
    selectedChord: IChord;
    onAddChord: () => void;
    onSelectChord: (chord: IChord) => void;
    // onMoveChord: (chordId: string, desiredIndex: number) => void;
}

const PartEditorChordsSelector: React.SFC<IPartEditorChordsSelectorProps> = (props: IPartEditorChordsSelectorProps) => (
    <div className="chords-selector">
        <PButton
            className="mt-m chords-selector-add-chord-button"
            secondary={true}
            onClick={props.onAddChord}>
            Add chord</PButton>
        <div className="selector-title chords-selector-title mt-l">Chords</div>
        <ul className="chords-selector-list">
            {props.chords && props.chords.map( (chord, index) => (
                <li key={chord.id}
                    className={
                        "chords-selector-chord " +
                        ((props.selectedChord === chord) ? "chords-selector-chord-selected" : "")
                    }
                    onClick={
                       () => { props.onSelectChord(chord); }
                    }
                    >
                    <div className="chords-selector-chord-name">
                        { chord.name || getNameForChordWithoutName(index) }
                    </div>
                </li>
            ))}
        </ul>

    </div>
);

function getNameForChordWithoutName(chordIndex: number) {
    return `Chord ${chordIndex + 1}`;
}

export default PartEditorChordsSelector;
