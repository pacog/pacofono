import * as React from "react";
import { IEnvelope } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import SliderWithInput from "components/SliderWithInput";
import "./style.scss";


interface IEnvelopeEditorProps {
    value: IEnvelope;
    onChange: (newEnvelope: IEnvelope) => void;
}

export class EnvelopeEditor extends React.Component<IEnvelopeEditorProps, {}> {

    public render() {
        return (
            <div className="envelope-editor">
                <FieldWithLabel label="Attack">
                    <SliderWithInput
                        value={ this.props.value.attack }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, attack: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Decay">
                    <SliderWithInput
                        value={ this.props.value.decay }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, decay: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Sustain">
                    <SliderWithInput
                        value={ this.props.value.sustain }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, sustain: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Release">
                    <SliderWithInput
                        value={ this.props.value.release }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, release: newVal });
                        } }
                    />
                </FieldWithLabel>
            </div>
        );
    }

}

export default EnvelopeEditor;
