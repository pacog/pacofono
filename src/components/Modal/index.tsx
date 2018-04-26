import * as React from "react";

import "./style.scss";

interface IModalProps {
    children?: any;
    onClose: () => void;
}

const Modal: React.SFC<IModalProps> = (props: IModalProps) => (
    <div className="modal-backdrop" onClick={props.onClose}>
        <div className="modal"
             onClick={(e) => { e.stopPropagation(); }}>
            { props.children }
        </div>
    </div>
);

export default Modal;
