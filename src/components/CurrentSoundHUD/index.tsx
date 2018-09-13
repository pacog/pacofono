import * as React from "react";

import PButton from "components/PButton";
import "./style.scss";

interface ICurrentSoundHUDProps {
    onOpenEditor: () => void;
}

const CurrentSoundHUD: React.SFC<ICurrentSoundHUDProps> = (props: ICurrentSoundHUDProps) => (
    <div className="current-sound-hud">

        <div className="current-sound-hud-title">
            My Sound
        </div>

        <div className="current-sound-content">
            <PButton
                primary={true}
                fullWidth={true}
                onClick={ props.onOpenEditor }>Edit sound</PButton>
        </div>
    </div>
);

export default CurrentSoundHUD;
