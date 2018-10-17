import * as React from "react";
import { ISound } from "types";
import "./am-synth-style.scss";

interface IAMSynthEditorProps {
    sound: ISound;
}

const AMSynthEditor: React.SFC<IAMSynthEditorProps> = (props: IAMSynthEditorProps) => (
    <div className="am-synth-editor">
        Duo synth ou yeah
    </div>
);

export default AMSynthEditor;
