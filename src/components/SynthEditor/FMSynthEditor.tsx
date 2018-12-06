import * as React from "react";
import { ISound, IFMSynthParams } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import SliderWithInput from "components/SliderWithInput";
import ControllableParamEditor from "components/ControllableParamEditor";
import EnvelopeEditor from "components/EnvelopeEditor";
import "./fm-synth-style.scss";

interface IFMSynthEditorProps {
    sound: ISound;
    onParamChange: (paramName: string, newValue: any) => void;
}

class FMSynthEditor extends React.Component<IFMSynthEditorProps, {}> {

    public render() {
        return (
            <div className="fm-synth-editor">
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

                    <FieldWithLabel label="Modulation index">
                        <SliderWithInput
                            value={ this.getParams().modulationIndex }
                            onChange={ (newVal) => {
                                this.props.onParamChange("modulationIndex", newVal);
                            } }
                            min={0}
                            max={20}
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Harmonicity">
                        <ControllableParamEditor
                            value={ this.getParams().harmonicity }
                            onChange={ (newVal) => {
                                this.props.onParamChange("harmonicity", newVal);
                            } }
                        />
                    </FieldWithLabel>
                </div>
            </div>
        );
    }

    private getParams(): IFMSynthParams {
        return this.props.sound.params as IFMSynthParams;
    }

}

export default FMSynthEditor;
