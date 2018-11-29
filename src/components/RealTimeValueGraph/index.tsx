import * as React from "react";

import "./style.scss";

export interface IRealTimeValueGraphProps {
    width?: number;
    height?: number;
}

const VALUES = [0.1, 0.2, 1, 0.9, 0.8];

class RealTimeValueGraph extends React.Component<IRealTimeValueGraphProps, {}> {

    public static defaultProps: Partial<IRealTimeValueGraphProps> = {
        width: 64,
        height: 24,
    };

    public render() {
        return (
            <div className="real-time-value-graph">
                <svg
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                    className="real-time-value-graph-svg"
                    viewBox={ `0 0 ${this.props.width} ${this.props.height}`}>
                    <path
                        d={ getPathFromValues(VALUES, this.props.width, this.props.height) }
                        stroke="green"
                        strokeWidth="1" />
                </svg>
            </div>
        );
    }

}

function getPathFromValues(values: number[], width: number, height: number): string {
    if (values.length === 0) {
        return "";
    }
    if (values.length === 1) {
        values = values.concat(values);
    }

    const valuesText = values
        .map((value, index) => {
            return getSVGCoordFromValue(value, width, height, index, values.length);
        })
        .map((value, index) => {
            if (index === 0) {
                return `M ${value}`;
            }
            return `L ${value}`;
        });

    return valuesText.join(" ");
}

function getSVGCoordFromValue(value: number, svgWidth: number, svgHeight: number, index: number, totalValues: number) {
    const xInViewport = (index / (totalValues - 1)) * svgWidth;
    const yInViewport = (1 - value) * svgHeight;

    return `${xInViewport},${yInViewport}`;
}

export default RealTimeValueGraph;
