import * as React from "react";
import ISongEditorProps from "./props";
import PButton from "components/PButton";

export default (props: ISongEditorProps) => {
    return (
        <div className="song-editor-confirm-content">
            <div>Do you really want to delete this song?</div>
            <div className="line-center mt-l">
                <PButton
                    secondary={true}
                    onClick={ props.onCancelDeleteSong }>
                    Cancel
                </PButton>
                <PButton
                    primary={true}
                    className="ml-sm"
                    onClick={ props.onDeleteSongConfirm }>
                    Delete song
                </PButton>
            </div>
        </div>
    );
};
