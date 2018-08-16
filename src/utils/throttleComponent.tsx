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

        public componentWillUnmount() {
            this.onChangeValueThrottled.cancel();
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
