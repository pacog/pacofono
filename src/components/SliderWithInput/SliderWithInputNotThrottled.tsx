import * as React from "react";

import "./style.scss";

export interface ISliderWithInputProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
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
                    className="slider-with-input-input"
                    value={this.props.value}
                    type="number"
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (!Number.isNaN(newValue)) {
                            this.props.onChange(newValue);
                        }
                    } }
                />

                {
                    this.props.unit &&
                    <div className="slider-with-input-unit">{this.props.unit}</div>
                }
            </div>
        );
    }
}
