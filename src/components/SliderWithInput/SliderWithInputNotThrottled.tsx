import * as React from "react";

import "./style.scss";

export interface ISliderWithInputProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

export class SliderWithInputNotThrottled extends React.Component<ISliderWithInputProps, {}> {

    public static defaultProps: Partial<ISliderWithInputProps> = {
        min: 0,
        max: 1,
        step: 0.01,
    };

    public render() {
        return (
            <div className="slider-with-input">
                <input
                    className="slider-with-input-slider"
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    value={this.props.value}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        this.props.onChange(newValue);
                    } }
                />

                <input
                    type="text"
                    className="slider-with-input-input p-input"
                    value={this.props.value}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (!Number.isNaN(newValue)) {
                            this.props.onChange(newValue);
                        }
                    } }
                />
            </div>
        );
    }
}
