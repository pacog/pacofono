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

interface IIconInfo {
    id: string;
}

interface IIconProps {
    icon: IIconInfo;
    size?: IconSizes;
}
const DEFAULT_SIZE = "m";

const Icon: React.SFC<IIconProps> = (props: IIconProps) => (
    <svg
        className={"icon icon-size-" + (props.size || DEFAULT_SIZE)}
        dangerouslySetInnerHTML={{__html: '<use xlink:href="#' + props.icon.id + '" />' }}
    />
);

export default Icon;
