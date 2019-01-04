import * as React from "react";
import { responseFunctions, getNameFor } from "constants/defaultResponseFunctions";
import "./style.scss";

interface IResponseFunctionSelectorProps {
    value: number[];
    onChange: (newSynthType: number[]) => void;
}

const ResponseFunctionSelector: React.SFC<IResponseFunctionSelectorProps> = (props: IResponseFunctionSelectorProps) => (
    <div className="response-function-selector">
        <select
            value={getNameFor(props.value)}
            onChange={(event) => {
                props.onChange(responseFunctions.get(event.target.value));
            }}>
            {
                createOptions()
            }
        </select>
    </div>
);

function createOptions() {
    return Array.from(responseFunctions).map((synthType) => {
        return (
            <option key={synthType[0]} value={synthType[0]}>{synthType[0]}</option>
        );
    });
}

export default ResponseFunctionSelector;
