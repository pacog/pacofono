import * as React from "react";

import "./style.scss";

interface ISoundEditorProps {

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
                Here you edit each element
            </div>
        </div>
    </div>
);

export default SoundEditor;
