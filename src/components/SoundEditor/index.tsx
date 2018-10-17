import * as React from "react";
import { SynthTypes, ISound } from "types";
import "./style.scss";
import SynthEditor from "components/SynthEditor";

interface ISoundEditorProps {
    sound: ISound;
    onSynthTypeSelected: (sound: ISound, newSynthType: SynthTypes) => void;
}

const SoundEditor: React.SFC<ISoundEditorProps> = (props: ISoundEditorProps) => (
    <div className="sound-editor">
        <div className="sound-editor-header modal-header">
            { props.sound.name }
        </div>
        <div className="sound-editor-content">
            <div className="sound-editor-sound-elements-list">
                Here is the list of elements
            </div>
            <div className="sound-editor-sound-elements-editor">
                <SynthEditor
                    sound={props.sound}
                    onSynthTypeSelected={props.onSynthTypeSelected}
                />
            </div>
        </div>
    </div>
);

export default SoundEditor;
