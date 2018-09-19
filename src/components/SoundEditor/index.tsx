import * as React from "react";
import { SynthTypes  } from "types";
import "./style.scss";

interface ISoundEditorProps {
    synthTypes: Map<SynthTypes, string>;
}

const SoundEditor: React.SFC<ISoundEditorProps> = (props: ISoundEditorProps) => (
    <div className="sound-editor">
        <div className="sound-editor-header modal-header">
            My sound
        </div>
        <div className="sound-editor-content">
            <div className="sound-editor-sound-elements-list">
                Here is the list of elements
            </div>
            <div className="sound-editor-sound-elements-editor">
                <select>
                    {
                        createSynthOptions(props.synthTypes)
                    }
                </select>
            </div>
        </div>
    </div>
);


function createSynthOptions(synthTypes: Map<SynthTypes, string>) {
    return Array.from(synthTypes).map((synthType) => {
        return (
            <option key={synthType[0]}>{synthType[1]}</option>
        );
    });
}
export default SoundEditor;
