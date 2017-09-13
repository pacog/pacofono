import * as React from "react";

// import * as styles from "./Hello.css";

interface ISongSelectorProps {
  songNames: string[];
}

const SongSelector: React.SFC<ISongSelectorProps> = (props: ISongSelectorProps) => (
  <ul>
    {props.songNames.map( (songName) => (
      <li key={songName}>{songName}</li>
    ))}
  </ul>
);

export default SongSelector;
