import * as React from "react";

import "./style.scss";

const Sidebar: React.SFC<{}> = (props: {children?: any}) => (
  <div className="sidebar sidebar-left">
    { props.children }
  </div>
);

export default Sidebar;
