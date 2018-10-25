import * as React from "react";
import { ISound, IAMSynthParams } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import SliderWithInput from "components/SliderWithInput";
import EnvelopeEditor from "components/EnvelopeEditor";
import "./am-synth-style.scss";

interface IAMSynthEditorProps {
    sound: ISound;
    onParamChange: (paramName: string, newValue: any) => void;
}

class AMSynthEditor extends React.Component<IAMSynthEditorProps, {}> {

    public render() {
        return (
            <div className="am-synth-editor">
                <div className="grow-full-width">
                    <FieldWithLabel label="Oscillator type">
                        <WaveTypeSelector
                            value={ this.getParams().type }
                            onChange={ (newVal) => {
                                this.props.onParamChange("type", newVal);
                            } }
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Envelope">
                        <EnvelopeEditor
                            value={ this.getParams().envelope }
                            onChange={ (newVal) => {
                                this.props.onParamChange("envelope", newVal);
                            } }
                        />
                    </FieldWithLabel>
                </div>
                <div className="grow-full-width">
                    <FieldWithLabel label="Modulation type">
                        <WaveTypeSelector
                            value={ this.getParams().modulationType }
                            onChange={ (newVal) => {
                                this.props.onParamChange("modulationType", newVal);
                            } }
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Modulation envelope">
                        <EnvelopeEditor
                            value={ this.getParams().modulationEnvelope }
                            onChange={ (newVal) => {
                                this.props.onParamChange("modulationEnvelope", newVal);
                            } }
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Harmonicity">
                        <SliderWithInput
                            value={ this.getParams().harmonicity }
                            onChange={ (newVal) => {
                                this.props.onParamChange("harmonicity", newVal);
                            } }
                            min={0}
                            max={24}
                        />
                    </FieldWithLabel>
                </div>
            </div>
        );
    }

    private getParams(): IAMSynthParams {
        return this.props.sound.params as IAMSynthParams;
    }

}

export default AMSynthEditor;
