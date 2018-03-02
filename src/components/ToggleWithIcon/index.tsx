import * as React from "react";
import * as styles from "./style.css";

import FaBeer from "react-icons/fa/beer";

const ToggleWithIcon: React.SFC<{}> = (props: {}) => (
    <div className={styles.container}>
        <FaBeer />
    </div>
);

export default ToggleWithIcon;
