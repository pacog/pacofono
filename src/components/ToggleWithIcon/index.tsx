import * as React from "react";

import "./style.scss";

interface IToggleWithIconProps {
  children?: any;
  selected: boolean;
  onSelect?: () => any;
}

const ToggleWithIcon: React.SFC<IToggleWithIconProps> = (props: IToggleWithIconProps) => (
    <div className={props.selected ? "styles.selected" : "styles.unselected"}
         onClick={props.onSelect}>
        { props.children }
    </div>
);

export default ToggleWithIcon;
