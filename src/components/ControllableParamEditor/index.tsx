import * as React from "react";

import { IControllableParam } from "types";
import "./style.scss";
import ControllerParamSelector from "components/ControllerParamSelector";

interface IControllableParamEditorProps {
    value: IControllableParam;
    onChange: (newParam: IControllableParam) => void;
}

const ControllableParamEditor: React.SFC<IControllableParamEditorProps> = (props: IControllableParamEditorProps) => (
    <div className="controllable-param">
        <ControllerParamSelector
            value={ props.value.controllerParam }
            onChange={ (newControllerParam) => {
                props.onChange({
                    ...this.value,
                    controllerParam: newControllerParam,
                });
            }}
        />
    </div>
);

export default ControllableParamEditor;
