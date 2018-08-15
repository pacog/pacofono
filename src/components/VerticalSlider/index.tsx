import * as React from "react";
import { throttle } from "lodash";

import "./style.scss";

interface IVerticalSliderProps {
    value: number;
    onChange: (newValue: number) => void;
}

interface IVerticalSliderState {
    lastValueReceived: number;
    currentValue: number;
    waitingForThrottle: boolean;
}


class VerticalSlider extends React.Component<IVerticalSliderProps, IVerticalSliderState> {

    public static getDerivedStateFromProps(nextProps: IVerticalSliderProps, prevState: IVerticalSliderState)
    : IVerticalSliderState {

        if (shouldUseNewValueFromProps(nextProps, prevState)) {
            return {
                ...prevState,
                currentValue: nextProps.value,
                lastValueReceived: nextProps.value,
            };
        } else {
            return {
                ...prevState,
                lastValueReceived: nextProps.value,
            };
        }

    }

    private onChangeValueThrottled = throttle(this.onValueChanged, 500);

    constructor(props: IVerticalSliderProps) {
        super(props);

        this.state = {
            waitingForThrottle: false,
            lastValueReceived: null,
            currentValue: props.value,
        };
    }

    public render() {
        return (
            <div className="main-volume-slider-wrapper">
                <input
                    className="main-volume-slider"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={this.state.currentValue}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        this.setState({
                            currentValue: newValue,
                            waitingForThrottle: true,
                        });
                        this.onChangeValueThrottled(newValue);
                    } }
                />
            </div>
        );
    }

    private onValueChanged(volume: number) {
        this.setState({
            waitingForThrottle: false,
        });
        this.props.onChange(volume);
    }

}

function shouldUseNewValueFromProps(nextProps: IVerticalSliderProps, prevState: IVerticalSliderState): boolean {
    if (prevState.currentValue === null) {
        return true;
    }
    if (prevState.waitingForThrottle) {
        return false;
    }
    const valueReceivedIsNew = prevState.lastValueReceived !== nextProps.value;
    if (valueReceivedIsNew) {
        return true;
    }
    return false;
}

export default VerticalSlider;
