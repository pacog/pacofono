import * as React from "react";
import * as styles from "./style.css";

import { ISong } from "types";

interface ISongEditorProps {
    song: ISong;
    onSaveSong: (song: ISong) => void;
    onClose: (song: ISong) => void;
    onSongNameChanged: (song: ISong, newValue: string) => void;
}

const SongEditor: React.SFC<ISongEditorProps> = (props: ISongEditorProps) => (
    <div className={styles.songEditor}>
        <div className={styles.songEditorNameAndTools}>
            <input
                value={props.song.name}
                className={styles.songEditorName}
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />
            <button>New</button>
            <button>Delete</button>
        </div>

        <div className={styles.songEditorFooter}>
            <button>Restore defaults</button>
            <div className={styles.songEditorFooterFiller}></div>
            <button onClick={() => { props.onClose(props.song); }}>Close</button>
            <button onClick={() => { props.onSaveSong(props.song); }}>Save</button>
        </div>
    </div>
);

export default SongEditor;
