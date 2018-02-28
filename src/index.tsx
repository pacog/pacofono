import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./root-styles.css";
import store from "./store";

import MainScreenContainer from "containers/MainScreenContainer";

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
          <MainScreenContainer />
        </Provider>,
        document.getElementById("pacofono-root"),
    );
};

render();
