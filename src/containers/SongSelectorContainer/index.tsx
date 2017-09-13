import { connect } from "react-redux";

import SongSelector from "../../components/SongSelector";
import { RootState } from "../../store/reducers/root";

const mapStateToProps = (state: RootState) => {
  return {
    songNames: state.songs.songs,
  };
};

export default connect(mapStateToProps, {})(SongSelector);

// import { actionCreators } from '@src/redux/counters';
// import { SFCCounter } from '../../';

//
// export const SFCCounterConnected = connect(mapStateToProps, {
//   onIncrement: actionCreators.incrementSfc,
// })(SFCCounter);
