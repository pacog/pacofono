import * as React from "react";
import { connect, Dispatch } from "react-redux";
import songIcon from "icons/song.svg";
import MdLinearScale from "react-icons/md/linear-scale";

import { SONG, SCALE } from "constants/musicModes";

import { IRootState } from "store/reducers/root";
import { getMusicMode } from "store/selectors/musicMode";
import { actionCreators } from "store/actions/musicMode";

import SongSelectorContainer from "containers/SongSelectorContainer";
import ToggleWithIcon from "components/ToggleWithIcon";
import Icon from "components/Icon";

interface IMusicModeSelectorProps {
    currentMusicMode: string;
    changeMusicMode: (newMode: string) => any; // TODO find a better return type
}



const MusicModeSelector: React.SFC<IMusicModeSelectorProps> = ({currentMusicMode, changeMusicMode}) => (
    <div className="{styles.container}">
        <div className="{styles.musicModeContainer}">
            <ToggleWithIcon selected={currentMusicMode === SONG}
                            onSelect={() => changeMusicMode(SONG)}>
                <Icon icon={songIcon} size="ml" />
            </ToggleWithIcon>
            {
                (currentMusicMode === SONG) &&
                <div className="{styles.musicModeInnerSelector}">
                    <SongSelectorContainer />
                </div>
            }
        </div>
        <div className="{styles.musicModeContainer}">
            <ToggleWithIcon selected={currentMusicMode === SCALE}
                            onSelect={() => changeMusicMode(SCALE)}
            >
                <MdLinearScale />
            </ToggleWithIcon>
            {
                (currentMusicMode === SCALE) &&
                <div className="{styles.musicModeInnerSelector}">
                    Select scale
                </div>
            }
        </div>
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
