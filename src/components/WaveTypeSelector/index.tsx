import * as React from "react";

import { WaveTypes } from "types";
import waveTypes from "constants/waveTypes";

import "./style.scss";

interface IWaveTypeSelectorProps {
    value: WaveTypes;
    onChange: (newWaveType: WaveTypes) => void;
}

const WaveTypeSelector: React.SFC<IWaveTypeSelectorProps> = (props: IWaveTypeSelectorProps) => (
    <div className="synth-type-selector">
        <select
            value={props.value}
            onChange={(event) => props.onChange(event.target.value as WaveTypes) }>
            {
                createWaveOptions()
            }
        </select>
    </div>
);

function createWaveOptions() {
    return Array.from(waveTypes).map((waveType) => {
        return (
            <option key={waveType[0]} value={waveType[0]}>{waveType[1]}</option>
        );
    });
}

export default WaveTypeSelector;
