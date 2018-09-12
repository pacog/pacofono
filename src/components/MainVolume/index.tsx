import * as React from "react";

import VerticalSlider from "components/VerticalSlider";
import Icon from "components/Icon";
import muteIcon from "icons/mute.svg";
import speakerIcon from "icons/speaker.svg";

import "./style.scss";

interface IMainVolumeProps {
    volume: number;
    mute: boolean;
    onVolumeChanged: (volume: number) => void;
    onMuteChanged: (mute: boolean) => void;
}

const MainVolume: React.SFC<IMainVolumeProps> = (props: IMainVolumeProps) => (
    <div className="main-volume">
        <div className="line-center"
            onClick={() => props.onMuteChanged(!props.mute) }>
            { props.mute && <Icon icon={muteIcon} size="ml" /> }
            { !props.mute && <Icon icon={speakerIcon} size="ml" /> }
        </div>
        { !props.mute &&
            <div className="mb-m">
                <VerticalSlider
                    value={ props.volume }
                    onChange={ props.onVolumeChanged }
                    ></VerticalSlider>
            </div>
        }

    </div>
);
export default MainVolume;
