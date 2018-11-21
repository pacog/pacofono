import * as React from "react";
import rolloffValues from "constants/rolloffValues";
import "./style.scss";

interface IRolloffSelectorProps {
    value: number;
    onChange: (newFilterType: number) => void;
}

const RolloffSelector: React.SFC<IRolloffSelectorProps> = (props: IRolloffSelectorProps) => (
    <div className="synth-type-selector">
        <select
            value={props.value.toString()}
            onChange={(event) => props.onChange(parseInt(event.target.value, 10)) }>
            {
                createSynthOptions()
            }
        </select>
    </div>
);

function createSynthOptions() {
    return Array.from(rolloffValues).map((rolloffValue) => {
        return (
            <option key={rolloffValue[0]} value={rolloffValue[0]}>{rolloffValue[1]}</option>
        );
    });
}

export default RolloffSelector;
