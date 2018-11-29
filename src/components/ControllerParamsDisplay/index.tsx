import * as React from "react";

import "./style.scss";
import RealTimeValueGraph from "components/RealTimeValueGraph";

// interface IControllerParamsDisplayProps {
//
// }

const ControllerParamsDisplay: React.SFC<{}> = (props: {}) => (
    <div className="controller-params-display">
        Controller Params:

        <div className="line-center">
            <div>X: </div>
            <RealTimeValueGraph />
        </div>
    </div>
);

export default ControllerParamsDisplay;
