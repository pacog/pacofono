import * as React from "react";
import { ISound } from "types";
import "./duo-synth-style.scss";

interface IDuoSynthEditorProps {
    sound: ISound;
}

const DuoSynthEditor: React.SFC<IDuoSynthEditorProps> = (props: IDuoSynthEditorProps) => (
    <div className="duo-synth-editor">
        Duo synth ou yeah
    </div>
);

export default DuoSynthEditor;
