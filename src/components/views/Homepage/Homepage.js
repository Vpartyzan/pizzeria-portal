import React from 'react';
import PropTypes from 'prop-types';
import styles from './Homepage.module.scss';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Homepage extends React.Component {
  static propTypes = {
    fetchOrder: PropTypes.func,
    fetchBooking: PropTypes.func,
    fetchEvent: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    }),
    allOrders: PropTypes.object,
  }

  componentDidMount() {
    const { fetchOrder, fetchBooking, fetchEvent } = this.props;
    fetchOrder();
    fetchBooking();
    fetchEvent();
  }

  renderRow() {
    const { allOrders } = this.props;

    let table = [];
    let event = allOrders.event,
      booking = allOrders.booking,
      order = allOrders.order;

    table = table.concat(event);
    table = table.concat(booking);
    table = table.concat(order);
    
    return (    
      table.map(row => (
        <TableRow key={table.indexOf(row) + 1}>
          <TableCell component="th" scope="row">
            {table.indexOf(row) + 1}
          </TableCell>
          <TableCell>
            {row.table ? row.table : '#'}
          </TableCell>
          <TableCell>
            {(row.hour) ? row.hour : '#'}
          </TableCell>
          <TableCell>
            {row.ppl ? row.ppl : '#'}
          </TableCell>
          <TableCell>
            {row.starters ? row.starters.map( pr => pr + '; ') : row.products.map( pr => pr.id + '; ')}
          </TableCell>
          <TableCell>
            {(!row.deliveryFee) ? 'Local' : 'Delivery'}
          </TableCell>
        </TableRow>
      ))
    );       
  }

  render() {
    const { loading: { active, error }, allOrders } = this.props;

    if (active || !allOrders.order.length || !allOrders.booking.length || !allOrders.booking.length) {
      return (
        <Paper className={styles.component}>
          <p>Loading...</p>
        </Paper>
      );
    } else if (error) {
      return (
        <Paper className={styles.component}>
          <p>Error! Details:</p>
          <pre>{error}</pre>
        </Paper>
      );
    } else {
      return (
        <Paper className={styles.component}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Table</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>People</TableCell>
                <TableCell>Starters</TableCell>
                <TableCell>Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderRow()}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }  
}

export default Homepage;