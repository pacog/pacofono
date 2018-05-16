import * as React from "react";
import ISongEditorProps from "./props";
import PButton from "components/PButton";

export default (props: ISongEditorProps) => {
    return (
        <div>
            <div>Are you sure you want to restore the defaults for this song?</div>
            <div className="line-center mt-m">
                <div className="grow-full-width"></div>

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
