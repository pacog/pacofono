import * as React from "react";

import "./style.scss";

interface IButtonProps {
    children?: any;
    onClick?: (event: any) => void;
}

const PIconButton: React.SFC<IButtonProps> = (props: IButtonProps) => (
  <button className="p-icon-button"
      onClick={props.onClick}>
    { props.children }
  </button>
);

export default PIconButton;
