import * as React from "react";
import * as styles from "./style.css";

import { ISong } from "types";

interface ISongEditorProps {
    song: ISong;
}

const SongEditor: React.SFC<ISongEditorProps> = (props: ISongEditorProps) => (
    <div>
        Song: {props.song.name}
    </div>
);

export default SongEditor;
