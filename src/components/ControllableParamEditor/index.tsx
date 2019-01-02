import * as React from "react";

import { IControllableParam, ControllerParams } from "types";
import getParamRestrictions from "constants/paramRestrictions";
import "./style.scss";
import ControllerParamSelector from "components/ControllerParamSelector";
import SliderWithInput from "components/SliderWithInput";
import { getMaxMinCustomValue, getMinMaxCustomValue } from "utils/controllableParamUtils";

interface IControllableParamEditorProps {
    value: IControllableParam;
    onChange: (newParam: IControllableParam) => void;
}


export default class ControllableParamEditor extends React.Component<IControllableParamEditorProps, {}> {

    constructor(props: IControllableParamEditorProps) {
        super(props);

        this.onControllerParamChange = this.onControllerParamChange.bind(this);
        this.onDefaultValueChange = this.onDefaultValueChange.bind(this);
        this.onMaxChange = this.onMaxChange.bind(this);
        this.onMinChange = this.onMinChange.bind(this);
        this.onStepChange = this.onStepChange.bind(this);
    }

    public render() {
        const restrictions = getParamRestrictions(this.props.value.name);

        return (
            <div className="controllable-param">
                <div className="line-center">
                    <div className="small-label mr-s">Control with</div>
                    <div className="grow-full-width">
                        <ControllerParamSelector
                            value={ this.props.value.controllerParam }
                            onChange={ this.onControllerParamChange }
                        />
                    </div>
                </div>
                {
                    (this.props.value.controllerParam === ControllerParams.none) &&
                    <div>
                        <div className="small-label mr-s">Default value</div>
                        <SliderWithInput
                            value={ this.props.value.defaultValue }
                            onChange={ this.onDefaultValueChange }
                            min={restrictions.min}
                            max={restrictions.max}
                            step={restrictions.step}
                        />
                    </div>
                }
                {
                    (this.props.value.controllerParam !== ControllerParams.none) &&
                    <div>
                        <div className="small-label mr-s">Min</div>
                        <SliderWithInput
                            value={this.props.value.customMin}
                            onChange={this.onMinChange}
                            min={restrictions.min}
                            max={getMaxMinCustomValue(restrictions, this.props.value)}
                        />

                        <div className="small-label mr-s">Max</div>
                        <SliderWithInput
                            value={this.props.value.customMax}
                            onChange={this.onMaxChange}
                            min={getMinMaxCustomValue(restrictions, this.props.value)}
                            max={restrictions.max}
                        />

                        <div className="small-label mr-s">Step</div>
                        <SliderWithInput
                            value={this.props.value.customStep}
                            onChange={this.onStepChange}
                            min={0}
                            max={2}
                        />
                    </div>
                }
            </div>
        );
    }

    private onControllerParamChange(newControllerParam: ControllerParams) {
        this.props.onChange({
            ...this.props.value,
            controllerParam: newControllerParam,
        });
    }

    private onDefaultValueChange(newDefaultValue: number) {
        this.props.onChange({
            ...this.props.value,
            defaultValue: newDefaultValue,
        });
    }

    private onMinChange(newMin: number) {
        this.props.onChange({
            ...this.props.value,
            customMin: newMin,
        });
    }

    private onMaxChange(newMax: number) {
        this.props.onChange({
            ...this.props.value,
            customMax: newMax,
        });
    }

    private onStepChange(newStep: number) {
        this.props.onChange({
            ...this.props.value,
            customStep: newStep,
        });
    }

}
