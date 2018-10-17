import * as React from "react";
import { ISound } from "types";
import "./mono-synth-style.scss";

interface IMonoSynthEditorProps {
    sound: ISound;
}

const MonoSynthEditor: React.SFC<IMonoSynthEditorProps> = (props: IMonoSynthEditorProps) => (
    <div className="mono-synth-editor">
        Mono synth ou yeah
    </div>
);

export default MonoSynthEditor;
