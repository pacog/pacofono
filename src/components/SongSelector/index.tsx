import * as React from "react";
import * as styles from "./style.css";

interface ISongSelectorProps {
  songNames: string[];
}

const SongSelector: React.SFC<ISongSelectorProps> = (props: ISongSelectorProps) => (
  <ul className={styles.container}>
    {props.songNames.map( (songName) => (
      <li key={songName}>{songName}</li>
    ))}
  </ul>
);

export default SongSelector;
