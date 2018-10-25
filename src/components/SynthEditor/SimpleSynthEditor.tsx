import * as React from "react";
import { ISound, ISimpleSynthParams } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import EnvelopeEditor from "components/EnvelopeEditor";
import "./simple-synth-style.scss";

interface ISimpleSynthEditorProps {
    sound: ISound;
    onParamChange: (paramName: string, newValue: any) => void;
}

class SimpleSynthEditor extends React.Component<ISimpleSynthEditorProps, {}> {

    public render() {
        return (
            <div className="simple-synth-editor">
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
            </div>
        );
    }

    private getParams(): ISimpleSynthParams {
        return this.props.sound.params as ISimpleSynthParams;
    }

}

export default SimpleSynthEditor;
