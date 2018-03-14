import * as React from "react";
import { ISong } from "types";

import * as styles from "./style.css";

interface ISongSelectorProps {
    songs: ISong[];
    onAddSongClick: () => void;
}

const SongSelector: React.SFC<ISongSelectorProps> = (props: ISongSelectorProps) => (
    <div>
        {
            (props.songs.length > 0) &&
            <ul className={styles.container}>
                {props.songs.map( (song) => (
                    <li key={song.id}>{song.name}</li>
                ))}
            </ul>
        }
        <button onClick={props.onAddSongClick}>Add a song</button>
    </div>
);

export default SongSelector;
