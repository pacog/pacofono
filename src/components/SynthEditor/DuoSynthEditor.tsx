import * as React from "react";
import { ISound, IDuoSynthParams } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import ControllableParamEditor from "components/ControllableParamEditor";
import SynthVoiceEditor from "components/SynthVoiceEditor";

import "./duo-synth-style.scss";

interface IDuoSynthEditorProps {
    sound: ISound;
    onParamChange: (paramName: string, newValue: any) => void;
}

export class DuoSynthEditor extends React.Component<IDuoSynthEditorProps, {}> {

    public render() {
        return (
            <div className="duo-synth-editor">
                <div className="grow-full-width">
                    <FieldWithLabel label="voice0">
                        <SynthVoiceEditor
                            value={ this.getParams().voice0 }
                            onChange={ (newVal) => {
                                this.props.onParamChange("voice0", newVal);
                            } }
                        />
                    </FieldWithLabel>
                </div>
                <div className="grow-full-width">
                    <FieldWithLabel label="voice1">
                        <SynthVoiceEditor
                            value={ this.getParams().voice1 }
                            onChange={ (newVal) => {
                                this.props.onParamChange("voice1", newVal);
                            } }
                        />
                    </FieldWithLabel>
                </div>
                <div className="grow-full-width">
                    <FieldWithLabel label="Vibrato amount">
                        <ControllableParamEditor
                            value={this.getParams().vibratoAmount}
                            onChange={(newVal) => {
                                this.props.onParamChange("vibratoAmount", newVal);
                            }}
                        />
                    </FieldWithLabel>
                    <FieldWithLabel label="Vibrato rate">
                        <ControllableParamEditor
                            value={this.getParams().vibratoRate}
                            onChange={(newVal) => {
                                this.props.onParamChange("vibratoRate", newVal);
                            }}
                        />
                    </FieldWithLabel>
                    <FieldWithLabel label="Harmonicity">
                        <ControllableParamEditor
                            value={this.getParams().harmonicity}
                            onChange={(newVal) => {
                                this.props.onParamChange("harmonicity", newVal);
                            }}
                        />
                    </FieldWithLabel>
                </div>
            </div>
        );
    }

    private getParams(): IDuoSynthParams {
        return this.props.sound.params as IDuoSynthParams;
    }
}

export default DuoSynthEditor;
