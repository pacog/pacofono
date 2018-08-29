import * as React from "react";
import { ICurrentSynths, currentSynths } from "modules/currentSynthInfo";
import { percentageToDecibels } from "utils/decibels";

import "./style.scss";

interface ISynthsDebuggerState {
    notes: ICurrentSynths;
}

class SynthsDebugger extends React.Component<{}, ISynthsDebuggerState> {

    private unsubscriber: () => void;

    constructor(props: {}) {
        super(props);
        this.state = {
            notes: null,
        };
    }

    public componentDidMount() {
        this.unsubscriber = currentSynths.subscribe((notes) => {
            this.setState({
                notes,
            });
        });
    }

    public render() {
        return (
            <div className="synths-debugger">
                { this.areThereNotesToShow() &&
                    <div>Synths playing:</div>
                }
                { this.state.notes && this.state.notes.currentNotes.map( (note, index) => (
                    <div key={index} className="synths-debugger-synth">
                        <div
                            className="synths-debugger-synth-content">
                            <div className="mr-m">{note.frequency ? note.frequency.toFixed(3) : "-"} Hz</div>
                            <div className="mr-m">{note.weight ? note.weight.toFixed(3) : "0"}%</div>
                            <div>{percentageToDecibels(note.weight).toFixed(3)}dB</div>
                        </div>
                        <div
                            className="synths-debugger-synth-bar"
                            style={{
                                transform: `translateX(${note.weight * 100}%)`,
                            }}
                            ></div>
                    </div>
                ))}

                { !this.areThereNotesToShow() &&
                    <div>No synths playing</div>
                }
            </div>
        );
    }

    public componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
            this.unsubscriber = null;
        }
    }

    private areThereNotesToShow(): boolean {
        return this.state.notes && this.state.notes.currentNotes && (this.state.notes.currentNotes.length > 0);
    }
}

export default SynthsDebugger;
