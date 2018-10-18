import * as React from "react";
import { ISound, WaveTypes } from "types";
import WaveTypeSelector from "components/WaveTypeSelector";
import "./am-synth-style.scss";

interface IAMSynthEditorProps {
    sound: ISound;
}

const AMSynthEditor: React.SFC<IAMSynthEditorProps> = (props: IAMSynthEditorProps) => (
    <div className="duo-synth-editor">
        Am synth ou yeah
        <div>
            <WaveTypeSelector
                value={ WaveTypes.Square }
                onChange={ (newVal) => console.log(newVal) }
            />
            modulationType  : square
        </div>
        phase  : 0 ,

harmonicity  : 1
type
    </div>
);

export default AMSynthEditor;
