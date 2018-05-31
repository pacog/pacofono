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
    <div className={"song-selector " + (props.songs.length ? "song-selector-with-songs" : "")}>
        {
            (props.songs.length > 0) &&
            <div>
                <div className="song-selector-title selector-title">
                    Select a song
                </div>
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
            </div>
        }
        <div className="song-selector-add-song">
            <PButton
                primary={true}
                fullWidth={true}
                onClick={props.onAddSongClick}>
                {
                    props.songs.length ? "Add a song" : "Add your first song"
                }
            </PButton>
        </div>
    </div>
);

export default SongSelector;
