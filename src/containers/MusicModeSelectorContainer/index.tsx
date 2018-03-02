import * as React from "react";

import ToggleWithIcon from "components/ToggleWithIcon";
import * as styles from "./style.css";

const MusicModeSelectorContainer: React.SFC<{}> = (props: {}) => (
    <div className={styles.container}>
        <ToggleWithIcon></ToggleWithIcon>
    </div>
);

export default MusicModeSelectorContainer;
