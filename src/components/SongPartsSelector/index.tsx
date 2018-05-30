import * as React from "react";
import { ISongPart } from "types";

import "./style.scss";

interface ISongPartsSelectorProps {
    parts: ISongPart[];
}

const SongPartsSelector: React.SFC<ISongPartsSelectorProps> = (props: ISongPartsSelectorProps) => (
    <div>Parts be here ({props.parts.length})</div>
);

export default SongPartsSelector;
