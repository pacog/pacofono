import * as React from "react";
import { IControllableParam } from "types";
import InputTransformEditorGraph from "./graph";
import ResponseFunctionSelector from "components/ResponseFunctionSelector";
import InputTransformRealTimeGraph from "./real-time-graph";

import "./style.scss";

interface IInputTransformEditorProps {
    value: IControllableParam;
    onChange: (newControlPoints: number[]) => void;
}

export default class InputTransformEditor extends React.Component<IInputTransformEditorProps, {}> {
    public render() {
        return (
            <div className="input-transform-editor">
                <div className="line-center mb-xs">
                    <div className="small-label mr-s">Response function</div>
                    <div className="grow-full-width">
                        <ResponseFunctionSelector
                            value={ this.props.value.inputTransformControlPoints }
                            onChange={ this.props.onChange }
                        />
                    </div>
                </div>
                <div className="line-center">
                    <InputTransformEditorGraph
                        points={this.props.value.inputTransformControlPoints}
                    />
                    <div className="grow-full-width ml-s">
                        <InputTransformRealTimeGraph
                            param={this.props.value}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
