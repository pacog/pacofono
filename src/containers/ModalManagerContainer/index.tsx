import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { IRootState } from "store/reducers/root";
import { isAnyModalOpen, isSongEditorModalOpen } from "store/selectors/modals";
import { actionCreators, IModalsActions } from "store/actions/modals";

import * as styles from "./style.css";

interface IModalManagerProps {
    isAnyModalOpen: boolean;
    isSongEditorModalOpen: boolean;
    closeAllModals: () => void;
}

const ModalManager: React.SFC<IModalManagerProps> = (props: IModalManagerProps) => (
    <div>
        {   props.isAnyModalOpen &&
            <div className={styles.modalsContainer}>
                <div className={styles.backdrop}
                     onClick={props.closeAllModals}></div>
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
        // TODO: create closeAllModals action, or make a smart heap of modals
        closeAllModals: () => {dispatch(actionCreators.closeSongEditor()); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);
