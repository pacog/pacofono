import * as React from "react";

import "./style.scss";

interface IMainOptionsProps {
    isSynthDebuggerShown: boolean;
    setShowSynthDebugger: (show: boolean) => void;
    isAudioOutputShown: boolean;
    setShowAudioOutput: (show: boolean) => void;
}

const MainOptions: React.SFC<IMainOptionsProps> = (props: IMainOptionsProps) => (
    <div className="main-options">
        <div className="main-options-header">
            Options
        </div>
        <div className="main-options-content">

            <label className="main-options-field">
                <input
                    className="mr-s"
                    name="audioOutput"
                    type="checkbox"
                    checked={props.isAudioOutputShown}
                    onChange={() => props.setShowAudioOutput(!props.isAudioOutputShown)} />

                Show audio output
            </label>

            <label className="main-options-field">
                <input
                    className="mr-s"
                    name="synthDebugger"
                    type="checkbox"
                    checked={props.isSynthDebuggerShown}
                    onChange={() => props.setShowSynthDebugger(!props.isSynthDebuggerShown)} />

                Show synth debugger
            </label>
        </div>
    </div>
);

export default MainOptions;
