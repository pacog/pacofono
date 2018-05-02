import * as React from "react";

import ISongEditorProps from "./props";
import showConfirmRestoreDefaultsPart from "./confirmRestoreDefaults";
import showConfirmDeleteSongPart from "./confirmDeleteSong";

import "./style.scss";

const SongEditor: React.SFC<ISongEditorProps> = (props: ISongEditorProps) => (
    <div className="{styles.songEditor}">
        {
            (!props.isShowingConfirmRestoreDefaults && !props.isShowingConfirmDeleteSong) &&
            showContentPart(props)
        }
        {
            props.isShowingConfirmRestoreDefaults &&
            showConfirmRestoreDefaultsPart(props)
        }
        {
            props.isShowingConfirmDeleteSong &&
            showConfirmDeleteSongPart(props)
        }
    </div>
);

function showContentPart(props: ISongEditorProps) {
    return (
        <div>
            { showHeaderPart(props) }
            <div className="{styles.songEditorContent}"></div>
            { showFooterPart(props) }
        </div>
    );
}

function showHeaderPart(props: ISongEditorProps) {
    return (
        <div className="{styles.songEditorNameAndTools}">
            <input
                value={props.song.name}
                className="p-input song-editor-name-input"
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />
            {
                !props.isNewSong &&
                <button
                    onClick={ props.onDeleteSong }
                    className="{[buttonStyles.button, styles.songEditorButtonRight]}">
                    Delete
                </button>
            }
        </div>
    );
}

function showFooterPart(props: ISongEditorProps) {
    return (
        <div className="{styles.songEditorFooter}">
            {
                !props.isNewSong &&
                <button className="{buttonStyles.button}"
                    onClick={() => { props.onRestoreDefaults(); }}
                >Restore defaults</button>
            }

            <div className="{styles.songEditorFooterFiller}"></div>

            <button
                onClick={() => { props.onClose(props.song); }}
                className="{[buttonStyles.button, styles.songEditorButtonRight]}">
                Close
            </button>
            <button
                onClick={() => { props.onSaveSong(); }}
                className="{[buttonStyles.button, styles.songEditorButtonRight]}">
                Save
            </button>
        </div>
    );
}

export default SongEditor;
