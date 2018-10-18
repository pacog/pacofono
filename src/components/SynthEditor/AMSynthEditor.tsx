import * as React from "react";
import { ISound, WaveTypes } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import SliderWithInput from "components/SliderWithInput";
import EnvelopeEditor from "components/EnvelopeEditor";
import "./am-synth-style.scss";

interface IAMSynthEditorProps {
    sound: ISound;
}

const AMSynthEditor: React.SFC<IAMSynthEditorProps> = (props: IAMSynthEditorProps) => (
    <div className="am-synth-editor">
        <div className="grow-full-width">
            <FieldWithLabel label="Oscillator type">
                <WaveTypeSelector
                    value={ WaveTypes.Sine }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>

            <FieldWithLabel label="Envelope">
                <EnvelopeEditor
                    value={ {
                        attack: 0.01 ,
                        decay: 0.01 ,
                        sustain: 1 ,
                        release: 0.5,
                    } }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>
        </div>
        <div className="grow-full-width">
            <FieldWithLabel label="Modulation type">
                <WaveTypeSelector
                    value={ WaveTypes.Square }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>

            <FieldWithLabel label="Modulation envelope">
                <EnvelopeEditor
                    value={ {
                        attack: 0.01 ,
                        decay: 0.01 ,
                        sustain: 1 ,
                        release: 0.5,
                    } }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>

            <FieldWithLabel label="Phase">
                <SliderWithInput
                    value={ 0.1 }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>

            <FieldWithLabel label="Harmonicity">
                <SliderWithInput
                    value={ 0.1 }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>
        </div>

    </div>
);

export default AMSynthEditor;
