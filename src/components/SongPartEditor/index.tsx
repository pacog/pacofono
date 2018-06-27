import * as React from "react";

import { ISong, ISongPart, IChord } from "types";
import PButton from "components/PButton";
import PartEditorChordsSelector from "components/PartEditorChordsSelector";
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
    onCancelDeletePart: () => void;
    onConfirmDeletePart: (part: ISongPart, song: ISong) => void;
}

const SongPartEditor: React.SFC<ISongPartEditorProps> = (props: ISongPartEditorProps) => (
    <div className="song-part-editor">
        {
            props.part &&
            <div className="line-center">
                <input
                    value={props.part.name}
                    className="p-input song-editor-name-input grow-full-width"
                    onChange={(e) => { props.onPartNameChanged(props.part, e.target.value); }} />

                {
                    props.canBeDeleted &&
                    <PButton
                        className="ml-m"
                        secondary={true}
                        onClick={props.onDeletePart }>
                            Delete part
                        </PButton>
                }
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
            onAddChord={() => console.log("Adding chord")}
            chords={props.chords}
            ></PartEditorChordsSelector>
    </div>
);

export default SongPartEditor;
