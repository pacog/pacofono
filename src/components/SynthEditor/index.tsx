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
    onParamChange: (sound: ISound, paramName: string, newValue: any) => void;
}

const SynthEditor: React.SFC<ISynthEditorProps> = (props: ISynthEditorProps) => (
    <React.Fragment>
        <SynthTypeSelector
            value={props.sound.synthType}
            onChange={(newSynthType) => props.onSynthTypeSelected(props.sound, newSynthType) }
        />
        { getSpecificSynthEditor(props) }
    </React.Fragment>
);

function getSpecificSynthEditor(props: ISynthEditorProps) {
    switch (props.sound.synthType) {
        case SynthTypes.AMSynth:
            return (
                <AMSynthEditor
                    sound={props.sound}
                    onParamChange={ (paramName: string, newValue: any ) => {
                        props.onParamChange(props.sound, paramName, newValue);
                    } }
                />
            );
        case SynthTypes.FMSynth:
            return (
                <FMSynthEditor
                    sound={props.sound}
                    onParamChange={ (paramName: string, newValue: any ) => {
                        props.onParamChange(props.sound, paramName, newValue);
                    } }
                />
            );
    case SynthTypes.MonoSynth:
        return (
            <MonoSynthEditor sound={props.sound}/>
        );
        case SynthTypes.Synth:
            return (
                <SimpleSynthEditor
                    sound={props.sound}
                    onParamChange={ (paramName: string, newValue: any ) => {
                        props.onParamChange(props.sound, paramName, newValue);
                    } }
                />
            );
        case SynthTypes.DuoSynth:
            return (
                <DuoSynthEditor
                    sound={props.sound}
                    onParamChange={ (paramName: string, newValue: any ) => {
                        props.onParamChange(props.sound, paramName, newValue);
                    } }
                />
            );
        default:
            return (
                <div> Unknown synth type</div>
            );
    }
}

export default SynthEditor;
