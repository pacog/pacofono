import * as React from "react";
import { ISong } from "types";
import * as buttonStyles from "style-common/buttons.css";
import * as styles from "./style.css";

interface ISongSelectorProps {
    songs: ISong[];
    selectedSong: ISong;
    onAddSongClick: () => void;
    onSelectSong: (song: ISong) => void;
}

const SongSelector: React.SFC<ISongSelectorProps> = (props: ISongSelectorProps) => (
    <div>
        {
            (props.songs.length > 0) &&
            <ul className={styles.container}>
                {props.songs.map( (song) => (
                    <li key={song.id}
                        className={
                            (props.selectedSong === song) ? styles.selected : styles.notSelected
                        }
                        onClick={
                            () => { props.onSelectSong(song); }
                        }>
                        {song.name}
                    </li>
                ))}
            </ul>
        }
        <button className={buttonStyles.button}onClick={props.onAddSongClick}>Add a song</button>
    </div>
);

export default SongSelector;
