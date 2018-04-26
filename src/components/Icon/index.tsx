import * as React from "react";

import "./style.scss";

type IconSizes =
    "xs"
    | "s"
    | "sm"
    | "m"
    | "ml"
    | "l"
    | "xl"
    | "xxl";

type IconColors =
    "white"
    | "black";

interface IIconInfo {
    id: string;
}

interface IIconProps {
    icon: IIconInfo;
    size?: IconSizes;
    color?: IconColors;
}

const Icon: React.SFC<IIconProps> = (props: IIconProps) => (
    <svg
        className={ getIconClasses(props) }
        dangerouslySetInnerHTML={{__html: '<use class="icon-use" xlink:href="#' + props.icon.id + '" />' }}
    />
);

const DEFAULT_SIZE = "m";
const DEFAULT_COLOR = "white";

function getIconClasses(props: IIconProps) {
    return [
        "icon",
        "icon-size-" + (props.size || DEFAULT_SIZE),
        "icon-color-" + (props.color || DEFAULT_COLOR),
    ].join(" ");
}

export default Icon;
