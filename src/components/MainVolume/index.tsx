import * as React from "react";
import { throttle } from "lodash";

import "./style.scss";

interface IMainVolumeProps {
    volume: number;
    mute: boolean;
    onVolumeChanged: (volume: number) => void;
    onMuteChanged: (mute: boolean) => void;
}

interface IMainVolumeState {
    lastValueSent: number;
    lastValueReceived: number;
    currentValue: number;
}

class MainVolume extends React.Component<IMainVolumeProps, IMainVolumeState> {

    public static getDerivedStateFromProps(nextProps: IMainVolumeProps, prevState: IMainVolumeState): IMainVolumeState {
        let newVolume;

        const lastValueSentIsCurrent = prevState.lastValueSent === prevState.currentValue;
        const propReceivedIsCurrent = nextProps.volume === prevState.lastValueSent;
        const newValueReceived = prevState.lastValueReceived !== nextProps.volume;

        if (lastValueSentIsCurrent && !propReceivedIsCurrent && newValueReceived) {
            newVolume = nextProps.volume;
        } else {
            newVolume = prevState.currentValue;
        }
        return { ...prevState, currentValue: newVolume, lastValueReceived: nextProps.volume };
    }

    private onChangeVolumeThrottled = throttle(this.onVolumeChanged, 500);

    constructor(props: IMainVolumeProps) {
        super(props);

        this.state = {
            lastValueSent: null,
            lastValueReceived: null,
            currentValue: props.volume,
        };
    }

    public render() {
        return (
            <div className="main-volume">
                <div>Volume: {this.props.volume}</div>
                <div className="main-volume-slider-wrapper">
                    <input
                        className="main-volume-slider"
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={this.state.currentValue}
                        onChange={(e) => {
                            const newVolume = parseFloat(e.target.value);
                            this.setState({
                                currentValue: newVolume,
                            });
                            this.onChangeVolumeThrottled(newVolume);
                        } }
                    />
                </div>
                <button onClick={() => this.props.onMuteChanged(!this.props.mute) }>
                    { this.props.mute ? "Muted" : "Not Muted" }
                </button>
            </div>
        );
    }

    private onVolumeChanged(volume: number) {
        this.setState({
            lastValueSent: volume,
        });
        this.props.onVolumeChanged(volume);
    }
}

export default MainVolume;
