import * as React from "react";
import ISongEditorProps from "./props";
import PButton from "components/PButton";

export default (props: ISongEditorProps) => {
    return (
        <div className="song-editor-confirm-content">
            <div>Are you sure you want to restore the defaults for this song?</div>
            <div className="line-center mt-l">
                <PButton
                    secondary={true}
                    onClick={ props.onCancelRestoreDefaults }>
                    Cancel
                </PButton>
                <PButton
                    primary={true}
                    className="ml-sm"
                    onClick={ props.onRestoreDefaultsConfirm }>
                    Restore defaults
                </PButton>
            </div>
        </div>
    );
};
