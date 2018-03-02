import * as React from "react";

import AppLogo from "components/AppLogo";
import Sidebar from "components/Sidebar";
import MusicModeSelectorContainer from "containers/MusicModeSelectorContainer";

import * as styles from "./style.css";

const MainScreenContainer: React.SFC<{}> = (props: {}) => (
    <div className={styles.background}>
        <AppLogo />
        <Sidebar>
            <MusicModeSelectorContainer />
        </Sidebar>
    </div>
);

export default MainScreenContainer;
