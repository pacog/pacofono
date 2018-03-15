import * as React from "react";
import * as styles from "./style.css";
import * as inputStyles from "style-common/inputs.css";
import * as buttonStyles from "style-common/buttons.css";

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
                className={[inputStyles.input, styles.songEditorName].join(" ") }
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />
            <button className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>New</button>
            <button className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>Delete</button>
        </div>

        <div className={styles.songEditorContent}></div>

        <div className={styles.songEditorFooter}>
            <button className={buttonStyles.button}>Restore defaults</button>

            <div className={styles.songEditorFooterFiller}></div>

            <button
                onClick={() => { props.onClose(props.song); }}
                className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>
                Close
            </button>
            <button
                onClick={() => { props.onSaveSong(props.song); }}
                className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>
                Save
            </button>
        </div>
    </div>
);

export default SongEditor;
