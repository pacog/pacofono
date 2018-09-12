import * as React from "react";
import { masterAnalyser } from "modules/masterOutput";

import "./style.scss";
const FPS = 12;
const DRAW_EVERY = 1000 / FPS;
const ONLY_GET_FIRST_BANDS = 32;

interface IMainOutputAudioState {
    amplitudes: number[];
}

class MainOutputAudio extends React.Component<{}, IMainOutputAudioState> {

    private lastRequestID: number;
    private lastCallToFrame: number;

    constructor(props: {}) {
        super(props);
        this.state = {
            amplitudes: [],
        };
    }

    public componentDidMount() {
        this.lastRequestID = window.requestAnimationFrame(this.eachFrame);
    }

    public render() {
        return (
            <div className="main-audio-output">
                <div className="main-audio-bars">
                    { this.state.amplitudes.map((amplitude, index) => (
                        <div
                            key={index}
                            className="main-audio-bar">

                            <div className="main-audio-bar-inner"
                                style={{
                                    transform: `translateY(${(1 - amplitude) * 100}%)`,
                                }}></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    public componentWillUnmount() {
        window.cancelAnimationFrame(this.lastRequestID);
    }

    private updateAmplitudes() {
        if (masterAnalyser) {
            const rawAmplitudes: Float32Array = masterAnalyser.getValue();
            const amplitudes: number[] = Array.prototype.slice.call(rawAmplitudes, 0, ONLY_GET_FIRST_BANDS)
                .map(getPercentageFromBandAmplitude);

            this.setState({
                amplitudes,
            });

        }
    }

    private eachFrame = (time: number) => {
        this.lastRequestID = window.requestAnimationFrame(this.eachFrame);

        let shouldPaint = false;
        if (!this.lastCallToFrame) {
            shouldPaint = true; // First time
        } else {
            const elapsed = time - this.lastCallToFrame;
            if (elapsed > DRAW_EVERY) {
                shouldPaint = true;
            }
        }

        if (shouldPaint) {
            this.lastCallToFrame = time;
            this.updateAmplitudes();
        }
    }
}

function getPercentageFromBandAmplitude(amplitude: number): number {
    const DB_TO_ADD = 140;
    const MULTIPLIER = 2;
    const MAX = 280;
    let result = ((amplitude + DB_TO_ADD) * MULTIPLIER) / MAX;
    result = Math.max(0, result);
    result = Math.min(1, result);
    return result;
}

export default MainOutputAudio;
