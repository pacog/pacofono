import * as React from "react";

import { ISong } from "types";

import PButton from "components/PButton";
import PIconButton from "components/PIconButton";
import Icon from "components/Icon";
import menuIcon from "icons/menu.svg";

import "./style.scss";

interface ISongDetailsProps {
    song: ISong;
    onEditSong: (song: ISong) => void;
    onShowSongsSelector: () => void;
}

const SongDetails: React.SFC<ISongDetailsProps> = (props: ISongDetailsProps) => (
    <div className="song-details">
        <div className="song-details-title">
            { props.song.name }
        </div>
        <div className="mv-l">Parts (TODO)</div>
        <PButton
            primary={true}
            fullWidth={true}
            onClick={
                (event) => {
                    props.onEditSong(props.song);
                }
            }>Edit song</PButton>
        <div className="song-details-show-all-songs">
            <PIconButton
                onClick={props.onShowSongsSelector}>
                <Icon icon={menuIcon} size="ml" />
            </PIconButton>
        </div>
    </div>
);

export default SongDetails;
