import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./root-styles.css";
import store from "./store";

import SongSelectorContainer from "./containers/SongSelectorContainer";

ReactDOM.render(
    <Provider store={store}>
      <SongSelectorContainer />
    </Provider>,
    document.getElementById("pacofono-root"),
);
