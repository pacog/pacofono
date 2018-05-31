import * as React from "react";

import { ISong, ISongPart } from "types";

import PButton from "components/PButton";
import PIconButton from "components/PIconButton";
import Icon from "components/Icon";
import menuIcon from "icons/menu.svg";

import "./style.scss";

interface ISongDetailsProps {
    song: ISong;
    songParts: ISongPart[];
    selectedPart: ISongPart;
    onEditSong: (song: ISong) => void;
    onShowSongsSelector: () => void;
    onPartSelected: (part: ISongPart) => void;
}

const SongDetails: React.SFC<ISongDetailsProps> = (props: ISongDetailsProps) => (
    <div className="song-details">
        <div className="song-details-title">
            { props.song.name }
        </div>
        <ul>
            {props.songParts.map( (part, index) => (
                <li key={part.id}
                    className={
                        "song-details-part " +
                        ((props.selectedPart === part) ? "song-details-part-selected" : "")
                    }
                    onClick={
                        () => { props.onPartSelected(part); }
                    }>

                    <span className="song-details-part-number">{index + 1}</span>
                    <span>{part.name}</span>
                </li>
            ))}
        </ul>
        <div className="song-details-edit-button-container">
            <PButton
                primary={true}
                fullWidth={true}
                onClick={
                    (event) => {
                        props.onEditSong(props.song);
                    }
                }>Edit song</PButton>
        </div>
        <div className="song-details-show-all-songs">
            <PIconButton
                onClick={props.onShowSongsSelector}>
                <Icon icon={menuIcon} size="ml" />
            </PIconButton>
        </div>
    </div>
);

export default SongDetails;
