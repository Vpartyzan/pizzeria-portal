import { connect } from 'react-redux';
import Homepage from './Homepage';

import { 
  getAll, 
  fetchOrderFromAPI, 
  fetchBookingFromAPI, 
  fetchEventFromAPI, 
  getLoadingState,
} from '../../../redux/homeRedux';

const mapStateToProps = (state) => ({
  allOrders: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrder: () => dispatch(fetchOrderFromAPI()),
  fetchBooking: () => dispatch(fetchBookingFromAPI()),
  fetchEvent: () => dispatch(fetchEventFromAPI()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);