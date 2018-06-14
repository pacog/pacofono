import * as React from "react";

import { ISongPart } from "types";
import PButton from "components/PButton";
import "./style.scss";

interface ISongPartEditorProps {
    part: ISongPart;
    canBeDeleted: boolean;
    onPartNameChanged: (part: ISongPart, newValue: string) => void;
    onDeletePart: (part: ISongPart) => void;
}

const SongPartEditor: React.SFC<ISongPartEditorProps> = (props: ISongPartEditorProps) => (
    <div className="song-part-editor">
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
                    onClick={() => props.onDeletePart(props.part) }>
                        Delete part
                    </PButton>
            }
        </div>
    </div>
);

export default SongPartEditor;
