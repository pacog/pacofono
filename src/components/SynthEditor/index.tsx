import * as React from "react";
import { SynthTypes, ISound } from "types";
import SynthTypeSelector from "components/SynthTypeSelector";
import "./style.scss";

interface ISynthEditorProps {
    sound: ISound;
    onSynthTypeSelected: (sound: ISound, newSynthType: SynthTypes) => void;
}

const SynthEditor: React.SFC<ISynthEditorProps> = (props: ISynthEditorProps) => (
    <React.Fragment>
        <SynthTypeSelector
            value={props.sound.synthType}
            onChange={(newSynthType) => props.onSynthTypeSelected(props.sound, newSynthType) }
        />
        <div>{ props.sound.synthType }</div>
    </React.Fragment>
);

export default SynthEditor;
