import * as React from "react";
import { connect } from "react-redux";

import { RootAction } from "store/actions";
import { Dispatch } from "redux";
import { IRootState } from "store/reducers/root";
import { isAnyModalOpen, isSongEditorModalOpen, isMainOptionsModalOpen } from "store/selectors/modals";
import { actionCreators as modalsActions } from "store/actions/modals";
import Modal from "components/Modal";
import SongEditorContainer from "containers/SongEditorContainer";

interface IModalManagerProps {
    isAnyModalOpen: boolean;
    isSongEditorModalOpen: boolean;
    isMainOptionsModalOpen: boolean;
    closeSongEditor: () => void;
    closeMainOptions: () => void;
}

const ModalManager: React.SFC<IModalManagerProps> = (props: IModalManagerProps) => (
    <div>
        {   props.isAnyModalOpen &&
            <div className="styles.modalsContainer">
                <div className="styles.backdrop"></div>
                {
                    props.isSongEditorModalOpen &&
                    <Modal
                        onClose={props.closeSongEditor}>
                        <SongEditorContainer />
                    </Modal>
                }
                {
                    props.isMainOptionsModalOpen &&
                    <Modal
                        onClose={props.closeMainOptions}>
                        Main options!
                    </Modal>
                }
            </div>
        }
    </div>
);

const mapStateToProps = (state: IRootState) => {
    return {
        isAnyModalOpen: isAnyModalOpen(state),
        isSongEditorModalOpen: isSongEditorModalOpen(state),
        isMainOptionsModalOpen: isMainOptionsModalOpen(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
    return {
        closeSongEditor: () => {
            // Nothing to do, it is handled in SongEditorContainer
        },

        closeMainOptions: () => {
            dispatch(modalsActions.closeMainOptions());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
