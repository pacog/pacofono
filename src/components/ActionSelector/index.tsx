import * as React from "react";
import * as classnames from "classnames";

import Icon from "components/Icon";
import arrowIcon from "icons/down-arrow.svg";
import "./style.scss";

interface IActionItemProps {
    label: string;
    onClick: () => void;
}

export const ActionItem: React.SFC<IActionItemProps> = (props: IActionItemProps) => (
    <button
        className="action-item"
        onClick={ props.onClick }>
        {props.label}
    </button>
);

interface IActionSelectorProps {
    label: string;
    children?: React.ReactNode;
}

interface IActionSelectorState {
    isOpen: boolean;
}

export class ActionSelector extends React.Component<IActionSelectorProps, IActionSelectorState> {

    private currentTimeout: number;

    constructor(props: IActionSelectorProps) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    public render() {
        return (<React.Fragment>
            <div className={ classnames({
                    "action-selector": true,
                    "action-selector-open": this.state.isOpen,
                }) }
                onBlur={ this.onBlur.bind(this) }>
                <button className="action-selector-button"
                    onClick={() => {
                        this.setState({ isOpen: !this.state.isOpen });
                    }}>
                    <span>{this.props.label}</span>
                    <Icon icon={arrowIcon} size="m" />
                </button>

                <div
                    className="action-selector-menu">
                    { this.props.children }
                </div>
            </div>
        </React.Fragment>);
    }

    public componentWillUnmount() {
        this.cancelCurrentTimeout();
    }

    private onBlur(event: React.FocusEvent): void {
        this.cancelCurrentTimeout();

        // TODO not the most robust way to do this. We should make sure events have gone up before closing
        this.currentTimeout = window.setTimeout(() => {
            this.setState({ isOpen: false });
        }, 300);
    }

    private cancelCurrentTimeout() {
        if (this.currentTimeout) {
            window.clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
    }

}
