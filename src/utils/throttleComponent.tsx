import * as React from "react";
import { throttle } from "lodash";

interface IThrottledProps {
    [key: string]: any;
}

interface IThrottledState {
    lastValueReceived: any;
    currentValue: any;
    waitingForThrottle: boolean;
}


const throttleComponent = <P extends object, ChangeValueType>(
    Component: React.ComponentType<P>,
    handlerName: string,
    valueName: string,
    throttleTime: number = 300,
) =>
    class WithThrottle extends React.Component<P & IThrottledProps, IThrottledState> {


        public static getDerivedStateFromProps(nextProps: P & IThrottledProps, prevState: IThrottledState)
        : IThrottledState {

            if (shouldUseNewValueFromProps(nextProps, prevState)) {
                return {
                    ...prevState,
                    currentValue: nextProps[valueName],
                    lastValueReceived: nextProps[valueName],
                };
            } else {
                return {
                    ...prevState,
                    lastValueReceived: nextProps[valueName],
                };
            }

        }

        private originalHandler: (value: ChangeValueType) => void;
        private onChangeValueThrottled = throttle(this.onValueChanged, throttleTime);

        constructor(props: P & IThrottledProps, ...args: any[]) {
            super(props, ...args);
            this.originalHandler = this.props[handlerName];
            this.state = {
                waitingForThrottle: false,
                lastValueReceived: null,
                currentValue: props[valueName],
            };
        }

        public render() {
            const { ...props } = this.props as IThrottledProps;
            props[handlerName] = (value: ChangeValueType) => this.onValueChangeBeforeThrottle(value);
            props[valueName] = this.state.currentValue;
            return <Component {...props } />;
        }

        private onValueChangeBeforeThrottle(newValue: ChangeValueType) {
            this.setState({
                currentValue: newValue,
                waitingForThrottle: true,
            });
            this.onChangeValueThrottled(newValue);
        }

        private onValueChanged(newValue: ChangeValueType) {
            this.setState({
                waitingForThrottle: false,
            });
            this.originalHandler(newValue);
        }

    };

function shouldUseNewValueFromProps(nextProps: IThrottledProps, prevState: IThrottledState): boolean {
    if (prevState.currentValue === null) {
        return true;
    }
    if (prevState.waitingForThrottle) {
        return false;
    }
    const valueReceivedIsNew = prevState.lastValueReceived !== nextProps.value;
    if (valueReceivedIsNew) {
        return true;
    }
    return false;
}


export default throttleComponent;
//

//
//
//
//     constructor(props: P) {
//         super(props);
//
//         this.state = {
//             waitingForThrottle: false,
//             lastValueReceived: null,
//             currentValue: props.value,
//         };
//     }
//
//     public render() {
//         return (
//             <div className="vertical-slider-wrapper">
//                 <input
//                     className="vertical-slider"
//                     type="range"
//                     min={this.props.min}
//                     max={this.props.max}
//                     step={this.props.step}
//                     value={this.state.currentValue}
//                     onChange={(e) => {
//                         const newValue = parseFloat(e.target.value);
//                         this.setState({
//                             currentValue: newValue,
//                             waitingForThrottle: true,
//                         });
//                         this.onChangeValueThrottled(newValue);
//                     } }
//                 />
//             </div>
//         );
//     }
//
//
//
// }
//




//
// export default VerticalSlider;

// export default const throttleComponent = <T extends object>(handlerName: string, interval: number) {
//     return (Target: React.ComponentClass): React.ComponentClass => {
//         class ThrottleHandler extends React.Component {
//             constructor(props: any) {
//                 super(props);
//
//                 // console.log(props[handlerName]);
//                 // const functionToThrottle: (...args: any[]) => void = props[handlerName];
//                 // const throttled = throttle(functionToThrottle, interval);
//                 //
//                 // this[handlerName] = (e, ...rest) => {
//                 //     if (e && typeof e.persist === "function") {
//                 //         e.persist()
//                 //     }
//                 //     return throttled(e, ...rest)
//                 // }
//             }
//
//             public render() {
//                 const newProps = {
//                     ...this.props,
//                     [handlerName]: (newValue: any) => { console.log(newValue); },
//                 };
//                 return React.createElement(Target, boolean);
//             }
//         }
//
//         return ThrottleHandler;
//     };
// }
