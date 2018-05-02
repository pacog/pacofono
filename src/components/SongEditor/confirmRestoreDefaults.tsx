import * as React from "react";
import ISongEditorProps from "./props";

export default (props: ISongEditorProps) => {
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
};
