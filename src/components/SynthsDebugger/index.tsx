import * as React from "react";
import { ICurrentSynths, currentSynths } from "modules/currentSynthInfo";
import { percentageToDecibels } from "utils/decibels";

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
                    <div key={index} className="line-center">
                        <div className="mr-m">{note.frequency ? note.frequency.toFixed(3) : "-"} Hz</div>
                        <div className="mr-m">{note.weight ? note.weight.toFixed(3) : "0"}%</div>
                        <div>{percentageToDecibels(note.weight).toFixed(3)}dB</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default SynthsDebugger;
