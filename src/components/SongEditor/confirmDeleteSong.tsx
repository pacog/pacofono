import * as React from "react";
import ISongEditorProps from "./props";
import PButton from "components/PButton";

export default (props: ISongEditorProps) => {
    return (
        <div>
            <div>Do you really want to delete this song?</div>
            <div className="line-center mt-m">
                <div className="grow-full-width"></div>

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
