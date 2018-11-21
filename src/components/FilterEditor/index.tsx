import * as React from "react";
import { IFilter } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import SliderWithInput from "components/SliderWithInput";
import FilterTypeSelector from "components/FilterTypeSelector";
import RolloffSelector from "components/RolloffSelector";
import "./style.scss";

interface IFilterEditorProps {
    value: IFilter;
    onChange: (newFilter: IFilter) => void;
}

export class FilterEditor extends React.Component<IFilterEditorProps, {}> {

    public render() {
        return (
            <div className="filter-editor">
                <FieldWithLabel label="Filter type">
                    <FilterTypeSelector
                        value={this.props.value.type}
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, type: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Q">
                    <SliderWithInput
                        value={ this.props.value.Q }
                        min={0}
                        max={100}
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, Q: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Gain">
                    <SliderWithInput
                        value={ this.props.value.gain }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, gain: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Frequency">
                    <SliderWithInput
                        value={ this.props.value.frequency }
                        min={1}
                        max={20000}
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, frequency: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Rolloff">
                    <RolloffSelector
                        value= { this.props.value.rolloff }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, rolloff: newVal });
                        } }
                    />
                </FieldWithLabel>
            </div>
        );
    }

}

export default FilterEditor;
