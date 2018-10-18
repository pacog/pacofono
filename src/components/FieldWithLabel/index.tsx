import * as React from "react";

import "./style.scss";

interface IFieldWithLabelProps {
    label: string;
    children?: React.ReactNode;
}

const FieldWithLabel: React.SFC<IFieldWithLabelProps> = (props: IFieldWithLabelProps) => (
    <div className="field-with-label">
        <div className="p-label">{ props.label }</div>
        { props.children }
    </div>
);

export default FieldWithLabel;
