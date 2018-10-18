import * as React from "react";
import { IEnvelope } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import SliderWithInput from "components/SliderWithInput";
import "./style.scss";


interface IEnvelopeEditorProps {
    value: IEnvelope;
    onChange: (newEnvelope: IEnvelope) => void;
}

const EnvelopeEditor: React.SFC<IEnvelopeEditorProps> = (props: IEnvelopeEditorProps) => (
    <div className="envelope-editor">
        <FieldWithLabel label="Attack">
            <SliderWithInput
                value={ props.value.attack }
                onChange={ (newVal) => {
                    props.onChange({... props.value, attack: newVal });
                } }
            />
        </FieldWithLabel>
        <FieldWithLabel label="Decay">
            <SliderWithInput
                value={ props.value.decay }
                onChange={ (newVal) => {
                    props.onChange({... props.value, decay: newVal });
                } }
            />
        </FieldWithLabel>
        <FieldWithLabel label="Sustain">
            <SliderWithInput
                value={ props.value.sustain }
                onChange={ (newVal) => {
                    props.onChange({... props.value, sustain: newVal });
                } }
            />
        </FieldWithLabel>
        <FieldWithLabel label="Release">
            <SliderWithInput
                value={ props.value.release }
                onChange={ (newVal) => {
                    props.onChange({... props.value, release: newVal });
                } }
            />
        </FieldWithLabel>
    </div>
);

export default EnvelopeEditor;
