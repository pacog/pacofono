import * as React from "react";
import { SynthTypes, ISound } from "types";
import "./style.scss";

interface ISoundEditorProps {
    synthTypes: Map<SynthTypes, string>;
    sound: ISound;
    onSynthTypeSelected: (newSynthType: SynthTypes) => void;
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
                <select
                    value={props.sound.synthType}
                    onChange={(event) => props.onSynthTypeSelected(event.target.value as SynthTypes) }>
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
            <option key={synthType[0]} value={synthType[0]}>{synthType[1]}</option>
        );
    });
}
export default SoundEditor;
