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

const PartEditorChordsSelector: React.SFC<IPartEditorChordsSelectorProps> = (props: IPartEditorChordsSelectorProps) => (
    <React.Fragment>
        <div className="selector-title mt-l">Chords</div>
        <div>Here be the chords ({props.chords.length})</div>

        <PButton
            className="mt-m"
            secondary={true}
            fullWidth={true}
            onClick={props.onAddChord}>
            Add chord</PButton>

    </React.Fragment>
);

export default PartEditorChordsSelector;
