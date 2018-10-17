import * as React from "react";
import { SynthTypes } from "types";
import synthTypes from "constants/synthTypes";
import "./style.scss";

interface ISynthTypeSelectorProps {
    value: SynthTypes;
    onChange: (newSynthType: SynthTypes) => void;
}

const SynthTypeSelector: React.SFC<ISynthTypeSelectorProps> = (props: ISynthTypeSelectorProps) => (
    <div className="synth-type-selector">
        <select
            value={props.value}
            onChange={(event) => props.onChange(event.target.value as SynthTypes) }>
            {
                createSynthOptions()
            }
        </select>
    </div>
);

function createSynthOptions() {
    return Array.from(synthTypes).map((synthType) => {
        return (
            <option key={synthType[0]} value={synthType[0]}>{synthType[1]}</option>
        );
    });
}

export default SynthTypeSelector;
