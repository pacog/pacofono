import * as React from "react";
import * as classnames from "classnames";

import "./style.scss";

interface IValueBarProps {
    value?: number;
    min?: number;
    max?: number;
    showValue?: boolean;

}

export default class ValueBar extends React.Component<IValueBarProps, {}> {

    public static defaultProps: Partial<IValueBarProps> = {
        min: 0,
        max: 1,
        showValue: false,
    };

    public render() {
        return (
            <div className={classnames({
                "value-bar": true,
                "value-bar-disabled": this.props.value === null,
            })}>
                <div className="value-bar-inner"
                    style={getTransformForProps(this.props)}>

                </div>
                {
                    this.props.showValue &&
                    <div className="value-bar-text">
                        {getValueText(this.props.value)}
                    </div>
                }
            </div>
        );
    }
}

function getTransformForProps(props: IValueBarProps): React.CSSProperties {
    const ratio = getRatioFromProps(props);
    const percentage = (ratio * 100) - 100;
    return {
        transform: `translateX(${percentage}%)`,
    };
}

function getRatioFromProps(props: IValueBarProps): number {
    if (props.value === null) {
        return 0;
    }
    if (props.min === props.max) {
        return 0;
    }
    return (props.value - props.min) / (props.max - props.min);
}

function getValueText(value: number): string {
    if (value === null) {
        return "-";
    }
    return value.toFixed(2);
}
