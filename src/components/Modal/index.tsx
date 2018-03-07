import * as React from "react";
import * as styles from "./style.css";

interface IModalProps {
    children?: any;
    onClose: () => void;
}

const Modal: React.SFC<IModalProps> = (props: IModalProps) => (
    <div className={styles.backdrop} onClick={props.onClose}>
        <div className={styles.modal}
             onClick={(e) => { e.stopPropagation(); }}>
            { props.children }
        </div>
    </div>
);

export default Modal;
