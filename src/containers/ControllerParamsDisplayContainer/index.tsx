import * as React from "react";
import { IControllerFrame } from "types";
import {
    IParamObject,
    ControllerParamsDisplay,
} from "components/ControllerParamsDisplay";
import { onFrame } from "modules/leapMotion/leapMotionFrameNotifier";

const VALUES_PER_PARAM = 20;

class ControllerParamsDisplayContainer extends React.Component<{}, IParamObject> {

    private onFrameUnsubscriber: () => void = null;

    constructor(props: {}) {
        super(props);
        this.state = this.getEmptyParams();
    }

    public componentDidMount() {
        this.onFrameUnsubscriber = onFrame.subscribe((frameInfo: IControllerFrame) => {
            this.handleFrame(frameInfo);
        });
    }

    public render() {
        return (
            <ControllerParamsDisplay params={this.state} />
        );
    }

    public componentWillUnmount() {
        if (this.onFrameUnsubscriber) {
            this.onFrameUnsubscriber();
            this.onFrameUnsubscriber = null;
        }
    }

    private handleFrame(frameInfo: IControllerFrame): void {
        this.setState({
            xRatio: {
                ...this.state.xRatio,
                values: this.addValueToArray(frameInfo.xRatio, this.state.xRatio.values),
            },
            yRatio: {
                ...this.state.yRatio,
                values: this.addValueToArray(frameInfo.yRatio, this.state.yRatio.values),
            },
            zRatio: {
                ...this.state.zRatio,
                values: this.addValueToArray(frameInfo.zRatio, this.state.zRatio.values),
            },
        });
    }

    private addValueToArray(value: number, array: number[]): number[] {
        let result = array.concat([value]);
        if (result.length > VALUES_PER_PARAM) {
            result = result.slice(result.length - VALUES_PER_PARAM);
        }
        return result;
    }

    private getEmptyParams(): IParamObject {
        return {
            xRatio : {
                id: "xRatio",
                name: "x",
                values: this.getFirstEmptyValuesArray(),
            },
            yRatio : {
                id: "yRatio",
                name: "y",
                values: this.getFirstEmptyValuesArray(),
            },
            zRatio : {
                id: "zRatio",
                name: "z",
                values: this.getFirstEmptyValuesArray(),
            },
        };
    }

    private getFirstEmptyValuesArray(): number[] {
        return Array.apply(null, Array(VALUES_PER_PARAM)).map(Number.prototype.valueOf, 0);
    }

}

export default ControllerParamsDisplayContainer;
