import * as React from "react";
import * as styles from "./style.css";

interface IToggleWithIconProps {
  children?: any;
  selected: boolean;
}

const ToggleWithIcon: React.SFC<IToggleWithIconProps> = (props: IToggleWithIconProps) => (
    <div className={props.selected ? styles.selected : styles.unselected}>
        { props.children }
    </div>
);

export default ToggleWithIcon;
