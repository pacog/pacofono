import * as React from "react";
import * as styles from "./style.css";
import * as inputStyles from "style-common/inputs.css";
import * as buttonStyles from "style-common/buttons.css";

import { ISong } from "types";

interface ISongEditorProps {
    song: ISong;
    isNewSong: boolean;
    isShowingConfirmRestoreDefaults: boolean;
    isShowingConfirmDeleteSong: boolean;
    onSaveSong: () => void;
    onClose: (song: ISong) => void;
    onSongNameChanged: (song: ISong, newValue: string) => void;
    onRestoreDefaults: () => void;
    onRestoreDefaultsConfirm: () => void;
    onCancelRestoreDefaults: () => void;
}

const SongEditor: React.SFC<ISongEditorProps> = (props: ISongEditorProps) => (
    <div className={styles.songEditor}>
        {
            (!props.isShowingConfirmRestoreDefaults && !props.isShowingConfirmDeleteSong) &&
            showContentPart(props)
        }
        {
            props.isShowingConfirmRestoreDefaults &&
            showConfirmRestoreDefaultsPart(props)
        }

    </div>
);

function showContentPart(props: ISongEditorProps) {
    return (
        <div>
            { showHeaderPart(props) }
            <div className={styles.songEditorContent}></div>
            { showFooterPart(props) }
        </div>
    );
}

function showHeaderPart(props: ISongEditorProps) {
    return (
        <div className={styles.songEditorNameAndTools}>
            <input
                value={props.song.name}
                className={[inputStyles.input, styles.songEditorName].join(" ") }
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />
            {
                !props.isNewSong &&
                <button className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>New</button>
            }
            {
                !props.isNewSong &&
                <button className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>
                    Delete
                </button>
            }
        </div>
    );
}

function showFooterPart(props: ISongEditorProps) {
    return (
        <div className={styles.songEditorFooter}>
            {
                !props.isNewSong &&
                <button className={buttonStyles.button}
                    onClick={() => { props.onRestoreDefaults(); }}
                >Restore defaults</button>
            }

            <div className={styles.songEditorFooterFiller}></div>

            <button
                onClick={() => { props.onClose(props.song); }}
                className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>
                Close
            </button>
            <button
                onClick={() => { props.onSaveSong(); }}
                className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>
                Save
            </button>
        </div>
    );
}

function showConfirmRestoreDefaultsPart(props: ISongEditorProps) {
    return (
        <div>
            <div>Are you sure you want to restore the defaults for this song?</div>
            <button
                onClick={ props.onCancelRestoreDefaults }
                className={[buttonStyles.button].join(" ")}>
                Cancel
            </button>
            <button
                onClick={ props.onRestoreDefaultsConfirm }
                className={[buttonStyles.button, styles.songEditorButtonRight].join(" ")}>
                Restore defaults
            </button>
        </div>
    );
}

export default SongEditor;
