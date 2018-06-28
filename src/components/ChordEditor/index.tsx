import * as React from "react";

import { IChord, ISongPart } from "types";
import PButton from "components/PButton";
import "./style.scss";

interface IChordEditorProps {
    part: ISongPart;
    chord: IChord;
    onChordNameChanged: (chord: IChord, newValue: string) => void;
    onDeleteChord: (chord: IChord, partId: string) => void;
    canBeDeleted: boolean;
}

const ChordEditor: React.SFC<IChordEditorProps> = (props: IChordEditorProps) => (
    <div className="chord-editor mt-l">
        <div className="line-center">
            <input
                value={props.chord.name}
                className="p-input song-editor-name-input grow-full-width"
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
    </div>
);

export default ChordEditor;
