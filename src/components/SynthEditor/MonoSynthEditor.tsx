import * as React from "react";
import { ISound, IMonoSynthParams } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import EnvelopeEditor from "components/EnvelopeEditor";
import FilterEnvelopeEditor from "components/FilterEnvelopeEditor";
import FilterEditor from "components/FilterEditor";
import "./mono-synth-style.scss";

interface IMonoSynthEditorProps {
    sound: ISound;
    onParamChange: (paramName: string, newValue: any) => void;
}

class MonoSynthEditor extends React.Component<IMonoSynthEditorProps, {}> {

    public render() {
        return (
            <div className="mono-synth-editor">
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
                    <FieldWithLabel label="Filter">
                        <FilterEditor
                            value={ this.getParams().filter }
                            onChange={ (newVal) => {
                                this.props.onParamChange("filter", newVal);
                            } }
                        />
                    </FieldWithLabel>
                </div>
                <div className="grow-full-width">
                    <FieldWithLabel label="Filter envelope">
                        <FilterEnvelopeEditor
                            value={ this.getParams().filterEnvelope }
                            onChange={ (newVal) => {
                                this.props.onParamChange("filterEnvelope", newVal);
                            } }
                        />
                    </FieldWithLabel>
                </div>
            </div>
        );
    }

    private getParams(): IMonoSynthParams {
        return this.props.sound.params as IMonoSynthParams;
    }
}

export default MonoSynthEditor;
