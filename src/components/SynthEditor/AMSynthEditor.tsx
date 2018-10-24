import * as React from "react";
import { ISound, IAMSynthParams } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import SliderWithInput from "components/SliderWithInput";
import EnvelopeEditor from "components/EnvelopeEditor";
import "./am-synth-style.scss";

interface IAMSynthEditorProps {
    sound: ISound;
}

export class AMSynthEditor extends React.Component<IAMSynthEditorProps, {}> {

    public render() {
        const params = this.props.sound.params as IAMSynthParams;
        return (
            <div className="am-synth-editor">
                <div className="grow-full-width">
                    <FieldWithLabel label="Oscillator type">
                        <WaveTypeSelector
                            value={ params.type }
                            onChange={ (newVal) => console.log(newVal) }
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Envelope">
                        <EnvelopeEditor
                            value={ {
                                attack: params.envelope.attack,
                                decay: params.envelope.decay,
                                sustain: params.envelope.sustain,
                                release: params.envelope.release,
                            } }
                            onChange={ (newVal) => console.log(newVal) }
                        />
                    </FieldWithLabel>
                </div>
                <div className="grow-full-width">
                    <FieldWithLabel label="Modulation type">
                        <WaveTypeSelector
                            value={ params.modulationType }
                            onChange={ (newVal) => console.log(newVal) }
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Modulation envelope">
                        <EnvelopeEditor
                            value={ {
                                attack: params.modulationEnvelope.attack,
                                decay: params.modulationEnvelope.decay,
                                sustain: params.modulationEnvelope.sustain,
                                release: params.modulationEnvelope.release,
                            } }
                            onChange={ (newVal) => console.log(newVal) }
                        />
                    </FieldWithLabel>

                    <FieldWithLabel label="Harmonicity">
                        <SliderWithInput
                            value={ params.harmonicity }
                            onChange={ (newVal) => console.log(newVal) }
                            min={0}
                            max={24}
                        />
                    </FieldWithLabel>
                </div>
            </div>
        );
    }

}

export default AMSynthEditor;
