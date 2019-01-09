import * as React from "react";

import { ISynthVoiceParams } from "types";
import WaveTypeSelector from "components/WaveTypeSelector";
import EnvelopeEditor from "components/EnvelopeEditor";
import FieldWithLabel from "components/FieldWithLabel";
import ControllableParamEditor from "components/ControllableParamEditor";

import "./style.scss";

interface ISynthVoiceEditorProps {
    value: ISynthVoiceParams;
    onChange: (newEnvelope: ISynthVoiceParams) => void;
}

export class SynthVoiceEditor extends React.Component<ISynthVoiceEditorProps, {}> {

    public render() {
        return (
            <div className="synth-voice-editor">
                <FieldWithLabel label="Volume">
                    <ControllableParamEditor
                        value={this.props.value.volume}
                        onChange={(newVal) => {
                            // this.props.onParamChange("volume", newVal);
                            this.props.onChange({ ... this.props.value, volume: newVal });
                        }}
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Type">
                    <WaveTypeSelector
                        value={ this.props.value.type }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, type: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Envelope">
                    <EnvelopeEditor
                        value={ this.props.value.envelope }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, envelope: newVal });
                        } }
                    />
                </FieldWithLabel>
                <FieldWithLabel label="Filter envelope">
                    <EnvelopeEditor
                        value={ this.props.value.filterEnvelope }
                        onChange={ (newVal) => {
                            this.props.onChange({... this.props.value, filterEnvelope: newVal });
                        } }
                    />
                </FieldWithLabel>
            </div>
        );
    }

}

export default SynthVoiceEditor;
