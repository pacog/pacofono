import * as React from "react";

import "./style.scss";

interface IButtonProps {
    children?: any;
    primary?: boolean;
    onClick?: (event: any) => void;
}

const Button: React.SFC<IButtonProps> = (props: IButtonProps) => (
    <button
        className="p-button"
        onClick={props.onClick}>
            { props.children }
    </button>
);

export default Button;
