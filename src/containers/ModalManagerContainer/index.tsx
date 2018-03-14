import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { IRootState } from "store/reducers/root";
import { isAnyModalOpen, isSongEditorModalOpen } from "store/selectors/modals";
import { actionCreators, IModalsActions } from "store/actions/modals";
import Modal from "components/Modal";
import SongEditorContainer from "containers/SongEditorContainer";

import * as styles from "./style.css";

interface IModalManagerProps {
    isAnyModalOpen: boolean;
    isSongEditorModalOpen: boolean;
    closeSongEditor: () => void;
}

const ModalManager: React.SFC<IModalManagerProps> = (props: IModalManagerProps) => (
    <div>
        {   props.isAnyModalOpen &&
            <div className={styles.modalsContainer}>
                <div className={styles.backdrop}></div>
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

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        closeSongEditor: () => {
            // TODO do the thunk action for this
            // dispatch(actionCreators.closeSongEditor());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
