import * as React from "react";

import VerticalSlider from "components/VerticalSlider";

import "./style.scss";

interface IMainVolumeProps {
    volume: number;
    mute: boolean;
    onVolumeChanged: (volume: number) => void;
    onMuteChanged: (mute: boolean) => void;
}

const MainVolume: React.SFC<IMainVolumeProps> = (props: IMainVolumeProps) => (
    <div className="main-volume">
        <div>Volume: {props.volume}</div>

        <VerticalSlider
            value={ props.volume }
            onChange={ props.onVolumeChanged }
            ></VerticalSlider>

        <button onClick={() => this.props.onMuteChanged(!props.mute) }>
            { props.mute ? "Muted" : "Not Muted" }
        </button>
    </div>
);
export default MainVolume;
