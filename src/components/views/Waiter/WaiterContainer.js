import { connect } from 'react-redux';
import Waiter from './Waiter';
import { getAll, fetchFromAPI, getLoadingState, fetchStatusUpdate } from '../../../redux/tablesRedux';

const mapStateToProps = (state) => ({
  tables: getAll(state),
  loading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTables: () => dispatch(fetchFromAPI()),
  updateStatus: (id, newStatus, newOrder) => dispatch(fetchStatusUpdate(id, newStatus, newOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Waiter);