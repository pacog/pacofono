import * as React from "react";

import AppLogo from "components/AppLogo";
import Sidebar from "components/Sidebar";
import MusicModeSelectorContainer from "containers/MusicModeSelectorContainer";
import ModalManagerContainer from "containers/ModalManagerContainer";

import "./style.scss";

const MainScreenContainer: React.SFC<{}> = (props: {}) => (
    <div className="main-screen-container">
        <AppLogo />
        <Sidebar>
            <MusicModeSelectorContainer />
        </Sidebar>
        <ModalManagerContainer />
    </div>
);

export default MainScreenContainer;
