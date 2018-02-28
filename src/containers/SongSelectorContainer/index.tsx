import { connect } from "react-redux";

import SongSelector from "components/SongSelector";
import { IRootState } from "store/reducers/root";

const mapStateToProps = (state: IRootState) => {
  return {
    songNames: state.songs.songs,
  };
};

export default connect(mapStateToProps, {})(SongSelector);
