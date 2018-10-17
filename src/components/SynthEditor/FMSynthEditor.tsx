import * as React from "react";
import { ISound } from "types";
import "./fm-synth-style.scss";

interface IFMSynthEditorProps {
    sound: ISound;
}

const FMSynthEditor: React.SFC<IFMSynthEditorProps> = (props: IFMSynthEditorProps) => (
    <div className="fm-synth-editor">
        FM synth ou yeah
    </div>
);

export default FMSynthEditor;
