import * as React from "react";
import { IChord } from "types";
import "./style.scss";

interface IPointerInputManagerProps {
    chords: IChord[];
    onPointStart: (chord: IChord) => void;
}

const PointerInputManager: React.SFC<IPointerInputManagerProps> = (props: IPointerInputManagerProps) => (
    <div className="pointer-input-manager">
        {
            props.chords &&
            props.chords.map( (chord) => (
                <div key={chord.id}
                    className="pointer-input-manager-chord"
                    onClick={
                        () => { props.onPointStart(chord); }
                    }>

                    <span className="pointer-input-manager-chord-name">{ chord.name }</span>
                </div>
            ))
        }
        {
            !props.chords &&
            <div>No chords :( please add or select a song</div>
        }
    </div>
);

export default PointerInputManager;
