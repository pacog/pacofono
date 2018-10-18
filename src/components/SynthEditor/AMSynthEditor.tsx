import * as React from "react";
import { ISound, WaveTypes } from "types";
import FieldWithLabel from "components/FieldWithLabel";
import WaveTypeSelector from "components/WaveTypeSelector";
import SliderWithInput from "components/SliderWithInput";
import "./am-synth-style.scss";

interface IAMSynthEditorProps {
    sound: ISound;
}

const AMSynthEditor: React.SFC<IAMSynthEditorProps> = (props: IAMSynthEditorProps) => (
    <div className="duo-synth-editor">
        <div>
            <FieldWithLabel label="Oscillator type">
                <WaveTypeSelector
                    value={ WaveTypes.Sine }
                    onChange={ (newVal) => console.log(newVal) }
                />
            </FieldWithLabel>


            <FieldWithLabel label="Modulation type">
                <WaveTypeSelector
                    value={ WaveTypes.Square }
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
