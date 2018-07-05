import * as React from "react";
import { connect } from "react-redux";

// import { RootAction } from "store/actions";
// import { Dispatch } from "redux";
import { IRootState } from "store/reducers/root";
import { isAnyModalOpen, isSongEditorModalOpen } from "store/selectors/modals";
import Modal from "components/Modal";
import SongEditorContainer from "containers/SongEditorContainer";

interface IModalManagerProps {
    isAnyModalOpen: boolean;
    isSongEditorModalOpen: boolean;
    closeSongEditor: () => void;
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
            </div>
        }
    </div>
);

const mapStateToProps = (state: IRootState) => {
    return {
        isAnyModalOpen: isAnyModalOpen(state),
        isSongEditorModalOpen: isSongEditorModalOpen(state),
    };
};

const mapDispatchToProps = (/*dispatch: Dispatch<RootAction>*/) => {
    return {
        closeSongEditor: () => {
            // Nothing to do, it is handled in SongEditorContainer
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
