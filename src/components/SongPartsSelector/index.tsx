import * as React from "react";

import "./style.scss";

interface ISongPartsSelectorProps {
    active: boolean;
}

const SongPartsSelector: React.SFC<ISongPartsSelectorProps> = (props: ISongPartsSelectorProps) => (
    <div>Parts be here</div>
);

export default SongPartsSelector;
