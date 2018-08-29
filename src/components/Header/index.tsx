import * as React from "react";

import AppLogo from "components/AppLogo";

import "./style.scss";

interface IHeaderProps {
    onShowOptions: () => void;
}

const Header: React.SFC<IHeaderProps> = (props: IHeaderProps) => (
    <div className="header">
        <AppLogo />
        <div className="header-menu">
            <div
                className="header-menu-item"
                onClick={ props.onShowOptions }>
                Options
            </div>
        </div>
    </div>
);

export default Header;
