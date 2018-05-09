import * as React from "react";

import "./style.scss";

interface IButtonProps {
    children?: any;
    primary?: boolean;
    secondary?: boolean;
    onClick?: (event: any) => void;
    className?: string;
}

const Button: React.SFC<IButtonProps> = (props: IButtonProps) => (
    <button
        className={ getClassNameFromProps(props) }
        onClick={props.onClick}>
            { props.children }
    </button>
);

function getClassNameFromProps(props: IButtonProps): string {
    const DEFAULT_CLASS = "p-button";
    const extraClassName = props.className || "";
    const importanceClass = getImportanceClassFromProps(props);
    return `${DEFAULT_CLASS} ${importanceClass} ${extraClassName}`;
}

function getImportanceClassFromProps(props: IButtonProps): string {
    if (props.primary) {
        return "p-button-primary";
    } else if (props.secondary) {
        return "p-button-secondary";
    }
    return "p-button-secondary";
}

export default Button;
