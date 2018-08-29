import * as React from "react";

import HeaderContainer from "containers/HeaderContainer";
import Sidebar from "components/Sidebar";
import MusicModeSelectorContainer from "containers/MusicModeSelectorContainer";
import ModalManagerContainer from "containers/ModalManagerContainer";
import PointerInputManagerContainer from "containers/PointerInputManagerContainer";
import SynthsDebugger from "components/SynthsDebugger";
import MainVolumeContainer from "containers/MainVolumeContainer";

import "./style.scss";

interface IMainScreenProps {
    showSynthsDebugger: boolean;
}

const MainScreen: React.SFC<IMainScreenProps> = (props: IMainScreenProps) => (
    <div className="main-screen-container">
        <HeaderContainer />
        <Sidebar>
            <MusicModeSelectorContainer />
        </Sidebar>
        <PointerInputManagerContainer />
        <ModalManagerContainer />
        { props.showSynthsDebugger && <SynthsDebugger /> }
        <MainVolumeContainer />
    </div>
);

export default MainScreen;
