import * as React from "react";

import ISongEditorProps from "./props";
import showConfirmRestoreDefaultsPart from "./confirmRestoreDefaults";
import showConfirmDeleteSongPart from "./confirmDeleteSong";
import PButton from "components/PButton";
import { ActionSelector, ActionItem } from "components/ActionSelector";
import SongPartsSelector from "components/SongPartsSelector";
import SongPartEditorContainer from "containers/SongPartEditorContainer";

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
            <div className="song-editor-content">
                <div className="song-editor-content-part-list">
                    <SongPartsSelector
                        parts={props.parts}
                        selectedPart={props.selectedPart}
                        onSelectPart={props.onSelectPart}
                        onAddPart={() => { props.onAddPart(props.song); }}
                        onMovePart={(partId, desiredIndex) => {
                            props.onMovePart(props.song.id, partId, desiredIndex);
                        }}
                        ></SongPartsSelector>
                </div>
                <div className="song-editor-content-part-editor">
                    <SongPartEditorContainer />
                </div>
            </div>
        </div>
    );
}

function showHeaderPart(props: ISongEditorProps) {
    return (
        <div className="song-editor-header line-center">
            <input
                value={props.song.name}
                className="p-input-big"
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />

            <div className="grow-full-width"></div>
            <ActionSelector
                label="Song actions"
                >
                <ActionItem label="action1" onClick={ () => { console.log(1); } }></ActionItem>
                <ActionItem label="action2" onClick={ () => { console.log(2); } }></ActionItem>
            </ActionSelector>
            {
                !props.isNewSong &&
                <PButton
                    className="ml-sm"
                    danger={true}
                    onClick={ props.onDeleteSong }>
                    Delete
                </PButton>
            }
            {
                !props.isNewSong &&
                <PButton
                    secondary={true}
                    className="ml-sm"
                    onClick={() => { props.onRestoreDefaults(); }}
                >Restore defaults</PButton>
            }
            <PButton
                secondary={true}
                className="ml-sm"
                onClick={() => { props.onClose(props.song); }}>
                Close
            </PButton>
            <PButton
                primary={true}
                className="ml-sm"
                onClick={() => { props.onSaveSong(); }}>
                Save and close
            </PButton>
        </div>
    );
}

export default SongEditor;
