import * as React from "react";

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
    onDeleteSong: () => void;
    onCancelDeleteSong: () => void;
    onDeleteSongConfirm: () => void;
}

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
                className="{inputStyles.inputstyles.songEditorName}"
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

function showConfirmRestoreDefaultsPart(props: ISongEditorProps) {
    return (
        <div>
            <div>Are you sure you want to restore the defaults for this song?</div>
            <button
                onClick={ props.onCancelRestoreDefaults }
                className="{[buttonStyles.button]}">
                Cancel
            </button>
            <button
                onClick={ props.onRestoreDefaultsConfirm }
                className="{[buttonStyles.button, styles.songEditorButtonRight]}">
                Restore defaults
            </button>
        </div>
    );
}

function showConfirmDeleteSongPart(props: ISongEditorProps) {
    return (
        <div>
            <div>Do you really want to delete this song?</div>
            <button
                onClick={ props.onCancelDeleteSong }
                className="{[buttonStyles.button]}">
                Cancel
            </button>
            <button
                onClick={ props.onDeleteSongConfirm }
                className="{[buttonStyles.button, styles.songEditorButtonRight]}">
                Delete song
            </button>
        </div>
    );
}

export default SongEditor;
