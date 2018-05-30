import * as React from "react";

import ISongEditorProps from "./props";
import showConfirmRestoreDefaultsPart from "./confirmRestoreDefaults";
import showConfirmDeleteSongPart from "./confirmDeleteSong";
import PButton from "components/PButton";
import SongPartsSelector from "components/SongPartsSelector";

import "./style.scss";

const SongEditor: React.SFC<ISongEditorProps> = (props: ISongEditorProps) => (
    <div className="song-editor">
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
            <div className="">
                <SongPartsSelector active={true}></SongPartsSelector>
            </div>
            { showFooterPart(props) }
        </div>
    );
}

function showHeaderPart(props: ISongEditorProps) {
    return (
        <div className="line-center">
            <input
                value={props.song.name}
                className="p-input song-editor-name-input grow-full-width"
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />
            {
                !props.isNewSong &&
                <PButton
                    className="ml-sm"
                    secondary={true}
                    onClick={ props.onDeleteSong }>
                    Delete
                </PButton>
            }
        </div>
    );
}

function showFooterPart(props: ISongEditorProps) {
    return (
        <div className="line-center mt-m">
            {
                !props.isNewSong &&
                <PButton
                    secondary={true}
                    onClick={() => { props.onRestoreDefaults(); }}
                >Restore defaults</PButton>
            }

            <div className="grow-full-width"></div>

            <PButton
                secondary={true}
                onClick={() => { props.onClose(props.song); }}>
                Close
            </PButton>
            <PButton
                primary={true}
                className="ml-sm"
                onClick={() => { props.onSaveSong(); }}>
                Save
            </PButton>
        </div>
    );
}

export default SongEditor;
