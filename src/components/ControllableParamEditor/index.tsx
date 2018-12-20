import * as React from "react";

import { IControllableParam } from "types";
import getParamRestrictions from "constants/paramRestrictions";
import "./style.scss";
import ControllerParamSelector from "components/ControllerParamSelector";
import SliderWithInput from "components/SliderWithInput";

interface IControllableParamEditorProps {
    value: IControllableParam;
    onChange: (newParam: IControllableParam) => void;
}

const ControllableParamEditor: React.SFC<IControllableParamEditorProps> = (props: IControllableParamEditorProps) => {
    const restrictions = getParamRestrictions(props.value.name);
    return (
        <div className="controllable-param">
            <div className="line-center">
                <div className="small-label mr-s">Control with</div>
                <div className="grow-full-width">
                    <ControllerParamSelector
                        value={props.value.controllerParam}
                        onChange={(newControllerParam) => {
                            props.onChange({
                                ...props.value,
                                controllerParam: newControllerParam,
                            });
                        }}
                    />
                </div>
            </div>

            <div>
                <div>Default value:</div>
                <SliderWithInput
                    value={props.value.defaultValue}
                    onChange={(newDefaultValue) => {
                        props.onChange({
                            ...props.value,
                            defaultValue: newDefaultValue,
                        });
                    }}
                    min={restrictions.min}
                    max={restrictions.max}
                    step={restrictions.step}
                />
            </div>
        </div>
    );
};

export default ControllableParamEditor;
