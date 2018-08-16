import * as React from "react";

import "./style.scss";

export interface IVerticalSliderProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

export class VerticalSliderNotThrottled extends React.Component<IVerticalSliderProps, {}> {

    public static defaultProps: Partial<IVerticalSliderProps> = {
        min: 0,
        max: 1,
        step: 0.01,
    };

    public render() {
        return (
            <div className="vertical-slider-wrapper">
                <input
                    className="vertical-slider"
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
            </div>
        );
    }
}
