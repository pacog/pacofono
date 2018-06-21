import * as React from "react";

import PButton from "components/PButton";

interface IConfirmDeletePartProps {
    onCancelDeletePart: () => void;
    onConfirmDeletePart: () => void;
}

export default (props: IConfirmDeletePartProps) => {
    return (
        <div className="song-part-editor-confirm-delete-part">
            <div className="song-part-editor-confirm-delete-part-backdrop"></div>
            <div className="song-part-editor-confirm-delete-part-content">
                <div>Are you sure you want to delete this part?</div>
                <div className="line-center mt-m">
                    <div className="grow-full-width"></div>

                    <PButton
                        secondary={true}
                        onClick={ props.onCancelDeletePart }>
                        Cancel
                    </PButton>
                    <PButton
                        primary={true}
                        className="ml-sm"
                        onClick={ props.onConfirmDeletePart }>
                        Delete part
                    </PButton>
                </div>
            </div>
        </div>
    );
};
