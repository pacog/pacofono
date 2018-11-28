import * as React from "react";

import "./style.scss";

interface ILeapMotionsStatusProps {
    isFocused: boolean;
    isConnected: boolean;
}

const LeapMotionsStatus: React.SFC<ILeapMotionsStatusProps> = (props: ILeapMotionsStatusProps) => (
    <div className="leap-motion-status">
        { props.isConnected &&
            <div className="leap-motion-status-item leap-motion-status-connected">
                Leap Motion connected
            </div>
        }

        { !props.isConnected &&
            <div className="leap-motion-status-item leap-motion-status-not-connected">
                Leap Motion NOT connected
            </div>
        }

        { !props.isFocused &&
            <div className="leap-motion-status-item leap-motion-status-not-connected">
                Not focused
            </div>
        }

    </div>
);

export default LeapMotionsStatus;
