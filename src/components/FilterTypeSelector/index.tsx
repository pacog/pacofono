import * as React from "react";
import { FilterTypes } from "types";
import filterTypes from "constants/filterTypes";
import "./style.scss";

interface IFilterTypeSelectorProps {
    value: FilterTypes;
    onChange: (newFilterType: FilterTypes) => void;
}

const FilterTypeSelector: React.SFC<IFilterTypeSelectorProps> = (props: IFilterTypeSelectorProps) => (
    <div className="synth-type-selector">
        <select
            value={props.value}
            onChange={(event) => props.onChange(event.target.value as FilterTypes) }>
            {
                createSynthOptions()
            }
        </select>
    </div>
);

function createSynthOptions() {
    return Array.from(filterTypes).map((filterType) => {
        return (
            <option key={filterType[0]} value={filterType[0]}>{filterType[1]}</option>
        );
    });
}

export default FilterTypeSelector;
