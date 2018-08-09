import * as React from "react";

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
        <div className="main-volume-slider-wrapper">
            <input
                className="main-volume-slider"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={props.volume}
                onChange={(e) => props.onVolumeChanged(parseFloat(e.target.value)) }
            />
        </div>
        <button onClick={() => props.onMuteChanged(!props.mute)}>
            { props.mute ? "Muted" : "Not Muted" }
        </button>
    </div>
);

export default MainVolume;
