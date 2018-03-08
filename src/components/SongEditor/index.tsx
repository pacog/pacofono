import * as React from "react";
import * as styles from "./style.css";

import { ISong } from "types";

interface ISongEditorProps {
    song: ISong;
}

const SongEditor: React.SFC<ISongEditorProps> = (props: ISongEditorProps) => (
    <div className={styles.songEditor}>
        <div className={styles.songEditorNameAndTools}>
            <input
                value={props.song.name}
                className={styles.songEditorName}
                onChange={() => { console.log("eyeye"); }} />
            <button>New</button>
            <button>Delete</button>
        </div>

        <div className={styles.songEditorFooter}>
            <button>Restore defaults</button>
            <div className={styles.songEditorFooterFiller}></div>
            <button>Close</button>
            <button>Save</button>
        </div>
    </div>
);

export default SongEditor;
