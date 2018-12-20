import * as React from "react";
import { IEnvelope } from "types";

import "./graph-style.scss";

interface IEnvelopeEditorGraphProps {
    width?: number;
    height?: number;
    envelope: IEnvelope;
}

export default class EnvelopeEditorGraph extends React.Component<IEnvelopeEditorGraphProps, {}> {

    public static defaultProps: Partial<IEnvelopeEditorGraphProps> = {
        width: 72,
        height: 48,
    };

    public render() {
        return (
            <div className="envelope-editor-graph">
                <svg
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                    }}
                    className="envelope-editor-graph-svg"
                    viewBox={`-1 -1 ${this.props.width + 1} ${this.props.height + 1}`}>
                    <path
                        className="envelope-editor-graph-svg-path"
                        d={getPathFromValues(this.props.envelope, this.props.width, this.props.height)}
                        />
                </svg>
            </div>
        );
    }
}


function getPathFromValues(envelope: IEnvelope, width: number, height: number): string {
    if (!envelope) {
        return "";
    }
    const pointsToPaint = getPointsFromEnvelope(envelope, width, height);
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

function getPointsFromEnvelope(envelope: IEnvelope, width: number, height: number): number[][] {
    const sustainPlateauRatio = 4 / 3; // So we show the sustain plateau with some width
    const totalDuration = (envelope.attack + envelope.decay + envelope.release) * sustainPlateauRatio;
    const xPeak = width * (envelope.attack / totalDuration);
    const xStartSustain = width * ((envelope.attack + envelope.decay) / totalDuration);
    const ySustain = height * (1 - envelope.sustain);
    const xEndSustain = width * (1 - ((envelope.release) / totalDuration));
    return [
        [0, height],
        [xPeak, 0],
        [xStartSustain, ySustain],
        [xEndSustain, ySustain],
        [width, height],
    ];
}
