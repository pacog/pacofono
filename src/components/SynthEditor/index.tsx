import * as React from "react";
import { SynthTypes, ISound } from "types";
import SynthTypeSelector from "components/SynthTypeSelector";
import AMSynthEditor from "./AMSynthEditor";
import FMSynthEditor from "./FMSynthEditor";
import MonoSynthEditor from "./MonoSynthEditor";
import SimpleSynthEditor from "./SimpleSynthEditor";
import DuoSynthEditor from "./DuoSynthEditor";
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
        { getSpecificSynthEditor(props.sound) }
    </React.Fragment>
);

function getSpecificSynthEditor(sound: ISound) {
    switch (sound.synthType) {
        case SynthTypes.AMSynth:
            return (
                <AMSynthEditor sound={sound}/>
            );
        case SynthTypes.FMSynth:
            return (
                <FMSynthEditor sound={sound}/>
            );
    case SynthTypes.MonoSynth:
        return (
            <MonoSynthEditor sound={sound}/>
        );
        case SynthTypes.Synth:
            return (
                <SimpleSynthEditor sound={sound}/>
            );
        case SynthTypes.DuoSynth:
            return (
                <DuoSynthEditor sound={sound}/>
            );
        default:
            return (
                <div> Unknown synth type</div>
            );
    }
}

export default SynthEditor;
