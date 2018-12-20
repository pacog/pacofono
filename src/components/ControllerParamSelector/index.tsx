import * as React from "react";
import { ControllerParams } from "types";
import controllerParams from "constants/controllerParams";
import "./style.scss";

interface IControllerParamSelectorProps {
    value: ControllerParams;
    onChange: (newControllerParam: ControllerParams) => void;
}

const ControllerParamSelector: React.SFC<IControllerParamSelectorProps> = (props: IControllerParamSelectorProps) => (
    <div className="controller-param-selector">
        <select
            className="controller-param-selector-select"
            value={props.value}
            onChange={(event) => props.onChange(event.target.value as ControllerParams) }>
            {
                createOptions()
            }
        </select>
    </div>
);

function createOptions() {
    return Array.from(controllerParams).map((controllerParam) => {
        return (
            <option key={controllerParam[0]} value={controllerParam[0]}>{controllerParam[1]}</option>
        );
    });
}

export default ControllerParamSelector;
