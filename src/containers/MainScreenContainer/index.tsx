import * as React from "react";
import AppLogo from "../../components/AppLogo";
import * as styles from "./style.css";

const MainScreenContainer: React.SFC<{}> = (props: {}) => (
  <div className={styles.background}>
    <AppLogo />
  </div>
);

export default MainScreenContainer;
