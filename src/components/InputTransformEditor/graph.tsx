import * as React from "react";

import "./graph-style.scss";

interface IInputTransformEditorGraphProps {
    width?: number;
    height?: number;
    points: number[];
}

export default class InputTransformEditorGraph extends React.Component<IInputTransformEditorGraphProps, {}> {

    public static defaultProps: Partial<IInputTransformEditorGraphProps> = {
        width: 48,
        height: 48,
    };

    public render() {
        return (
            <div className="input-transform-editor-graph">
                <svg
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                    className="input-transform-editor-svg"
                    viewBox={`-1 -1 ${this.props.width + 1} ${this.props.height + 1}`}>
                    <path
                        className="input-transform-editor-svg-path"
                        d={getPathFromValues(this.props.points, this.props.width, this.props.height)}
                    />
                </svg>
            </div>
        );
    }
}

function getPathFromValues(points: number[], width: number, height: number): string {
    if (!points || !points.length) {
        return "";
    }
    const pointsToUse = points.slice();
    if (pointsToUse.length === 1) {
        pointsToUse[1] = pointsToUse[0];
    }
    const pointsToPaint = pointsToUse.map((point, i) => {
        const xPos = width * (i / (pointsToUse.length - 1));
        const yPos = height * (1 - point);
        return [xPos, yPos];
    });
    const valuesText = pointsToPaint
        .map((value) => value.join(","))
        .map((value, index) => {
            if (index === 0) {
                return `M ${value}`;
            }
            return `L ${value}`;
        });

    return valuesText.join(" ");
}
