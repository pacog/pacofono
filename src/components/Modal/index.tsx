import * as React from "react";
import * as styles from "./style.css";

interface IModalProps {
    children?: any;
}

const Modal: React.SFC<IModalProps> = (props: IModalProps) => (
    <div className={styles.modal}>
        { props.children }
    </div>
);

export default Modal;
