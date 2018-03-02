import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { SONG, SCALE } from "constants/musicModes";
import ToggleWithIcon from "components/ToggleWithIcon";
import FaMusic from "react-icons/fa/music";
import MdLinearScale from "react-icons/md/linear-scale";
import { IRootState } from "store/reducers/root";
import * as styles from "./style.css";
import { getMusicMode } from "store/selectors/musicMode";
import { actionCreators, IMusicModeActions } from "store/actions/musicMode";

interface IMusicModeSelector {
    currentMusicMode: string;
    changeMusicMode: (newMode: string) => any; // TODO find a better return type
}

const MusicModeSelector: React.SFC<IMusicModeSelector> = ({currentMusicMode, changeMusicMode}) => (
    <div className={styles.container}>
        <ToggleWithIcon selected={currentMusicMode === SONG}
                        onSelect={() => changeMusicMode(SONG)}>
            <FaMusic />
        </ToggleWithIcon>
        <ToggleWithIcon selected={currentMusicMode === SCALE}
                        onSelect={() => changeMusicMode(SCALE)}
        >
            <MdLinearScale />
        </ToggleWithIcon>
    </div>
);

const mapStateToProps = (state: IRootState) => {
    return {
        currentMusicMode: getMusicMode(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IRootState>) => {
    return {
        changeMusicMode: (newMode: string) => dispatch(actionCreators.changeMusicMode(newMode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicModeSelector);
