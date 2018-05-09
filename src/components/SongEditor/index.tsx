import * as React from "react";

import ISongEditorProps from "./props";
import showConfirmRestoreDefaultsPart from "./confirmRestoreDefaults";
import showConfirmDeleteSongPart from "./confirmDeleteSong";
import PButton from "components/PButton";

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
                <PButton
                    onClick={ props.onDeleteSong }>
                    Delete
                </PButton>
            }
        </div>
    );
}

function showFooterPart(props: ISongEditorProps) {
    return (
        <div className="{styles.songEditorFooter}">
            {
                !props.isNewSong &&
                <PButton
                    onClick={() => { props.onRestoreDefaults(); }}
                >Restore defaults</PButton>
            }

            <div className="{styles.songEditorFooterFiller}"></div>

            <PButton
                onClick={() => { props.onClose(props.song); }}>
                Close
            </PButton>
            <PButton
                onClick={() => { props.onSaveSong(); }}>
                Save
            </PButton>
        </div>
    );
}

export default SongEditor;
