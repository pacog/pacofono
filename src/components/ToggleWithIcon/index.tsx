import * as React from "react";
import * as styles from "./style.css";

interface IToggleWithIconProps {
  children?: any;
  selected: boolean;
  onSelect?: () => any;
}

const ToggleWithIcon: React.SFC<IToggleWithIconProps> = (props: IToggleWithIconProps) => (
    <div className={props.selected ? styles.selected : styles.unselected}
         onClick={props.onSelect}>
        { props.children }
    </div>
);

export default ToggleWithIcon;
