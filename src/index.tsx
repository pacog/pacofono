import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as Leap from "leapjs";

import "./root-style/index.scss";
import store from "./store";

console.log(Leap);

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
