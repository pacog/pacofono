import * as React from "react";
import { IFilterEnvelope, IEnvelope } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import SliderWithInput from "components/SliderWithInput";
import EnvelopeEditor from "components/EnvelopeEditor";
import "./style.scss";

interface IFilterEnvelopeEditorProps {
    value: IFilterEnvelope;
    onChange: (newEnvelope: IFilterEnvelope) => void;
}

class FilterEnvelopeEditor extends React.Component<IFilterEnvelopeEditorProps, {}> {

    public render() {
        return (
            <div className="filter-envelope-editor">
                <FieldWithLabel label="Base frequency">
                    <SliderWithInput
                        value={ this.props.value.baseFrequency }
                        min={1}
                        max={20000}
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, baseFrequency: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Octaves">
                    <SliderWithInput
                        value={ this.props.value.octaves }
                        min={0}
                        max={16}
                        step={1}
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, octaves: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Exponent">
                    <SliderWithInput
                        value={ this.props.value.exponent }
                        min={0}
                        max={16}
                        step={1}
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, exponent: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Exponent">
                    <EnvelopeEditor
                        value={ this.getEnvelope() }
                        onChange={ (newVal) => {
                            this.updateFilterEnvelope(newVal);
                        } }
                    />
                </FieldWithLabel>
            </div>
        );
    }

    private getEnvelope(): IEnvelope {
        const {
            attack,
            decay,
            sustain,
            release,
        } = this.props.value;
        return {
            attack,
            decay,
            sustain,
            release,
        };
    }

    private updateFilterEnvelope(newEnvelope: IEnvelope) {
        this.props.onChange({... this.props.value, ...newEnvelope });
    }

}

export default FilterEnvelopeEditor;
