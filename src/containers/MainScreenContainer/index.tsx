import * as React from "react";

import AppLogo from "components/AppLogo";
import Sidebar from "components/Sidebar";
import * as styles from "./style.css";

const MainScreenContainer: React.SFC<{}> = (props: {}) => (
  <div className={styles.background}>
    <AppLogo />
    <Sidebar>
        TODO
    </Sidebar>
  </div>
);

export default MainScreenContainer;
