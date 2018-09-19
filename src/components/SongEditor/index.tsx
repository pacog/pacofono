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
        <div className="song-editor-header modal-header line-center">
            <input
                value={props.song.name}
                className="p-input-big"
                onChange={(e) => { props.onSongNameChanged(props.song, e.target.value); }} />

            <div className="grow-full-width"></div>
            <ActionSelector
                label="Song actions"
                >
                {
                    !props.isNewSong &&
                    <ActionItem
                        label="Save as copy"
                        onClick={ props.onSaveSongAsCopy }
                        ></ActionItem>
                }
                {
                    !props.isNewSong &&
                    <ActionItem
                        label="Restore defaults"
                        onClick={ props.onRestoreDefaults }
                        ></ActionItem>
                }
                {
                    !props.isNewSong &&
                    <ActionItem
                        label="Delete song"
                        onClick={ props.onDeleteSong }
                        ></ActionItem>
                }
            </ActionSelector>
            <PButton
                secondary={true}
                className="ml-sm"
                onClick={() => { props.onClose(props.song); }}>
                Close and discard changes
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
