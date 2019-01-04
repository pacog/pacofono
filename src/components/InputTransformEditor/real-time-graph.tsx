import * as React from "react";
import { IControllerFrame, IControllableParam } from "types";
import { onFrame } from "modules/leapMotion/leapMotionFrameNotifier";
import { getControllableParamValue } from "modules/getControllableParamValue";
import ValueBar from "components/ValueBar";

interface IRealTimeGraphProps {
    param: IControllableParam;
}

interface IRealTimeState {
    input: number;
    output: number;
}

class InputTransformRealTimeGraph extends React.Component<IRealTimeGraphProps, IRealTimeState> {

    private onFrameUnsubscriber: () => void = null;

    constructor(props: IRealTimeGraphProps) {
        super(props);
        this.state = {
            output: 0,
            input: 0,
        };
    }

    public componentDidMount() {
        this.onFrameUnsubscriber = onFrame.subscribe((frameInfo: IControllerFrame) => {
            this.handleFrame(frameInfo);
        });
    }

    public render() {
        return (
            <div>
                <div>
                    <div className="small-label">Input</div>
                    <ValueBar value={this.state.input} />
                </div>
                <div>
                    <div className="small-label mt-xs">Output</div>
                    <ValueBar
                        value={this.state.output}
                        showValue={true}
                        min={this.props.param.customMin}
                        max={this.props.param.customMax}
                    />
                </div>
            </div>
        );
    }

    public componentWillUnmount() {
        if (this.onFrameUnsubscriber) {
            this.onFrameUnsubscriber();
            this.onFrameUnsubscriber = null;
        }
    }

    private handleFrame(frameInfo: IControllerFrame): void {
        const value = getControllableParamValue(this.props.param, frameInfo);
        const paramName = this.props.param.controllerParam.toString();
        const input = (frameInfo as any)[paramName];
        this.setState({
            output: value,
            input,
        });
    }

}

export default InputTransformRealTimeGraph;
