import * as React from "react";
import ISongEditorProps from "./props";

export default (props: ISongEditorProps) => {
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
};
