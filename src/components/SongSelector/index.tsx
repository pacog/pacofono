import * as React from "react";

interface SongSelectorProps {
  songNames: string[];
}

const SongSelector: React.SFC<SongSelectorProps> = (props: SongSelectorProps) => (
  <ul>
    {props.songNames.map( songName => (
      <li key={songName}>{songName}</li>
    ))}
  </ul>
);

export default SongSelector;
