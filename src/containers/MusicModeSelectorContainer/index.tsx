import * as React from "react";
import { connect } from "react-redux";

import ToggleWithIcon from "components/ToggleWithIcon";
import FaBeer from "react-icons/fa/beer";
import { IRootState } from "store/reducers/root";
import * as styles from "./style.css";
// import { getSongNames } from "store/selectors/songs";

const MusicModeSelector: React.SFC<{}> = (props: {}) => (
    <div className={styles.container}>
        <ToggleWithIcon selected={false}>
            <FaBeer />
        </ToggleWithIcon>
    </div>
);

const mapStateToProps = (state: IRootState) => {
    return {};
};

export default connect(mapStateToProps, {})(MusicModeSelector);
