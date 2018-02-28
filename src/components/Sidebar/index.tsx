import * as React from "react";
import * as styles from "./style.css";

const Sidebar: React.SFC<{}> = (props: {children?: any}) => (
  <div className={styles.sidebar}>
    { props.children }
  </div>
);

export default Sidebar;
