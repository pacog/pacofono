import * as React from "react";
import { ISongPart } from "types";
import PButton from "components/PButton";

import "./style.scss";

interface ISongPartsSelectorProps {
    parts: ISongPart[];
    onAddPart: () => void;
}

const SongPartsSelector: React.SFC<ISongPartsSelectorProps> = (props: ISongPartsSelectorProps) => (
    <React.Fragment>
        <div className="selector-title song-parts-selector-title">Song parts</div>
        <ul className="mb-m">
            {props.parts.map( (part) => (
                <li key={part.id}
                    className="song-parts-selector-part ">
                    {part.name}
                </li>
            ))}
        </ul>
        <PButton
            secondary={true}
            fullWidth={true}
            onClick={props.onAddPart}>
            Add part</PButton>
    </React.Fragment>
);

export default SongPartsSelector;
