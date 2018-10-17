import * as React from "react";
import { ISound } from "types";
import "./simple-synth-style.scss";

interface ISimpleSynthEditorProps {
    sound: ISound;
}

const SimpleSynthEditor: React.SFC<ISimpleSynthEditorProps> = (props: ISimpleSynthEditorProps) => (
    <div className="simple-synth-editor">
        Simple synth ou yeah
    </div>
);

export default SimpleSynthEditor;
