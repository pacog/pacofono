import * as React from "react";
import * as styles from "./style.css";

interface ISongSelectorProps {
    songNames: string[];
    onAddSongClick: () => void;
}

const SongSelector: React.SFC<ISongSelectorProps> = (props: ISongSelectorProps) => (
    // <ul className={styles.container}>
    //     {props.songNames.map( (songName) => (
    //         <li key={songName}>{songName}</li>
    //     ))}
    // </ul>
    <button onClick={props.onAddSongClick}>Add a song</button>
);

export default SongSelector;
