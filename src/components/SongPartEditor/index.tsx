import * as React from "react";

import { ISongPart } from "types";
import "./style.scss";

interface ISongPartEditorProps {
    part: ISongPart;
    onPartNameChanged: (part: ISongPart, newValue: string) => void;
}

const SongPartEditor: React.SFC<ISongPartEditorProps> = (props: ISongPartEditorProps) => (
    <div className="song-part-editor">
        <input
            value={props.part.name}
            className="p-input song-editor-name-input grow-full-width"
            onChange={(e) => { props.onPartNameChanged(props.part, e.target.value); }} />
    </div>
);

export default SongPartEditor;
