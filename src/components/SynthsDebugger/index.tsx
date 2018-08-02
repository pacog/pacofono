import * as React from "react";
import { ICurrentSynths, currentSynths } from "modules/currentSynthInfo";

import "./style.scss";

interface ISynthsDebuggerState {
    notes: ICurrentSynths;
}

class SynthsDebugger extends React.Component<{}, ISynthsDebuggerState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            notes: null,
        };
    }

    public componentDidMount() {
        currentSynths.subscribe((notes) => {
            this.setState({
                notes,
            });
        });
    }

    public render() {
        return (
            <div className="synths-debugger">
                { this.state.notes && this.state.notes.currentNotes.map( (note, index) => (
                    <div key={index}>
                        {note.frequency} Hz, {note.weight}
                    </div>
                ))}
            </div>
        );
    }
}

export default SynthsDebugger;
