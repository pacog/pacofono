import * as React from "react";

import "./style.scss";
import RealTimeValueGraph from "components/RealTimeValueGraph";

export interface IControllerParams {
    id: string;
    name: string;
    values: number[];
}

export interface IParamObject {
    [paramKey: string]: IControllerParams;
}

interface IControllerParamsDisplayProps {
    params: IParamObject;
}

export const ControllerParamsDisplay
: React.SFC<IControllerParamsDisplayProps> = (props: IControllerParamsDisplayProps) => (
    <div className="controller-params-display">
        <div className="controller-params-display-title mb-sm">Leap Params:</div>

        { Object.keys(props.params)
            .map((key) => props.params[key])
            .map((param) => (
                <div
                    key={param.id}
                    className="controller-params-display-param">
                    <div className="controller-params-display-param-name">{param.name}:</div>
                    <RealTimeValueGraph values={param.values}/>
                </div>
        ))}

    </div>
);
