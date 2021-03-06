import * as React from "react";

import HeaderContainer from "containers/HeaderContainer";
import Sidebar from "components/Sidebar";
import MusicModeSelectorContainer from "containers/MusicModeSelectorContainer";
import ModalManagerContainer from "containers/ModalManagerContainer";
import PointerInputManagerContainer from "containers/PointerInputManagerContainer";
import SynthsDebugger from "components/SynthsDebugger";
import MainAudioOutput from "components/MainAudioOutput";
import MainVolumeContainer from "containers/MainVolumeContainer";
import CurrentSoundHUDContainer from "containers/CurrentSoundHUDContainer";
import LeapMotionStatusContainer from "containers/LeapMotionStatusContainer";
import ControllerParamsDisplayContainer from "containers/ControllerParamsDisplayContainer";

import "./style.scss";

interface IMainScreenProps {
    showSynthsDebugger: boolean;
    showAudioOutput: boolean;
}

const MainScreen: React.SFC<IMainScreenProps> = (props: IMainScreenProps) => (
    <div className="main-screen-container">
        <HeaderContainer />
        <LeapMotionStatusContainer />
        <Sidebar>
            <MusicModeSelectorContainer />
        </Sidebar>
        <PointerInputManagerContainer />
        <ModalManagerContainer />
        <div className="main-screen-tools">
            { props.showSynthsDebugger && <SynthsDebugger /> }
            { props.showAudioOutput && <MainAudioOutput /> }
            <ControllerParamsDisplayContainer />
        </div>
        <MainVolumeContainer />
        <CurrentSoundHUDContainer />
    </div>
);

export default MainScreen;
