import * as React from "react";
import { IEnvelope } from "types";
import SliderWithValue from "components/SliderWithValue";
import EnvelopeEditorGraph from "./EnvelopeEditorGraph";

import "./style.scss";

interface IEnvelopeEditorProps {
    value: IEnvelope;
    onChange: (newEnvelope: IEnvelope) => void;
}

export class EnvelopeEditor extends React.Component<IEnvelopeEditorProps, {}> {

    public render() {
        return (
            <div className="envelope-editor">
                <EnvelopeEditorGraph
                    envelope={this.props.value}
                ></EnvelopeEditorGraph>
                <div className="envelope-editor-sliders">
                    <SliderWithValue
                        label="AT"
                        value={this.props.value.attack}
                        unit="s"
                        onChange={(newVal) => {
                            this.props.onChange({ ... this.props.value, attack: newVal });
                        }}
                    />
                    <SliderWithValue
                        label="DE"
                        value={this.props.value.decay}
                        unit="s"
                        onChange={(newVal) => {
                            this.props.onChange({ ... this.props.value, decay: newVal });
                        }}
                    />
                    <SliderWithValue
                        label="SU"
                        value={this.props.value.sustain}
                        unit="/1"
                        onChange={(newVal) => {
                            this.props.onChange({ ... this.props.value, sustain: newVal });
                        }}
                    />
                    <SliderWithValue
                        label="RE"
                        value={this.props.value.release}
                        unit="s"
                        onChange={(newVal) => {
                            this.props.onChange({ ... this.props.value, release: newVal });
                        }}
                    />
                </div>
            </div>
        );
    }

}

export default EnvelopeEditor;
