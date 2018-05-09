import * as React from "react";
import { ISong } from "types";

import PButton from "components/PButton";
import "./style.scss";

interface ISongSelectorProps {
    songs: ISong[];
    selectedSong: ISong;
    onAddSongClick: () => void;
    onSelectSong: (song: ISong) => void;
}

const SongSelector: React.SFC<ISongSelectorProps> = (props: ISongSelectorProps) => (
    <div className="song-selector">
        {
            (props.songs.length > 0) &&
            <ul className="song-selector-song-list">
                {props.songs.map( (song) => (
                    <li key={song.id}
                        className={
                            "song-selector-song " +
                            ((props.selectedSong === song) ? "song-selector-song-selected" : "")
                        }
                        onClick={
                            () => { props.onSelectSong(song); }
                        }>
                        {song.name}
                    </li>
                ))}
            </ul>
        }
        <div className="song-selector-add-song">
            <PButton
                primary={true}
                onClick={props.onAddSongClick}
                >Add a song</PButton>
        </div>
    </div>
);

export default SongSelector;
