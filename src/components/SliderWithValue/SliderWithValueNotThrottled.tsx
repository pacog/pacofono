import * as React from "react";

import "./style.scss";

export interface ISliderWithValueProps {
    value: number;
    onChange: (newValue: number) => void;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    decimalsToShow?: number;
    unit?: string;
}

export class SliderWithValueNotThrottled extends React.Component<ISliderWithValueProps, {}> {

    public static defaultProps: Partial<ISliderWithValueProps> = {
        label: "",
        min: 0,
        max: 1,
        step: 0.01,
        decimalsToShow: 2,
        unit: "",
    };

    public render() {
        return (
            <div className="slider-with-value">
                {this.props.label &&
                    <div className="slider-with-value-label">
                        {this.props.label}
                    </div>
                }
                <input
                    className="slider-with-value-slider"
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    value={this.props.value}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        this.props.onChange(newValue);
                    }}
                />

                <div className="slider-with-value-value">
                    { this.props.value.toFixed(this.props.decimalsToShow) }
                </div>

                { this.props.unit &&
                    <div className="slider-with-value-unit">
                        { this.props.unit }
                    </div>
                }

            </div>
        );
    }
}
