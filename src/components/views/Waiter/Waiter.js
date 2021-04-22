import React from 'react';
import PropTypes from 'prop-types';
import styles from './Waiter.module.scss';

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Waiter extends React.Component {
  static propTypes = {
    fetchTables: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    }),
    tables: PropTypes.array,
    updateStatus: PropTypes.func,
  }

  componentDidMount() {
    const { fetchTables } = this.props;
    fetchTables();
  }

  renderActions(id, status, order) {
    const { updateStatus } = this.props;

    switch (status) {
      case 'free':
        return (
          <>
            <Button onClick={ () => { updateStatus(id, 'thinking', order); }}>thinking</Button>
            <Button type='submit' component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>new order</Button>
          </>
        );
      case 'thinking':
        return (
          <Button type='submit' component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/new`}>new order</Button>
        );
      case 'ordered':
        return (
          <Button onClick={ () => { updateStatus(id, 'prepared', order); }}>prepared</Button>
        );
      case 'prepared':
        return (
          <Button onClick={ () => { updateStatus(id, 'delivered', order); }}>delivered</Button>
        );
      case 'delivered':
        return (
          <Button onClick={ () => { updateStatus(id, 'paid', order); }}>paid</Button>
        );
      case 'paid':
        return (
          <Button onClick={ () => { updateStatus(id, 'free', order = null); }}>free</Button>
        );
      default:
        return null;
    }
  }

  render() {
    const { loading: { active, error }, tables } = this.props;
    console.log(tables);

    if (active || !tables.length) {
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
                <TableCell>Table</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tables.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {row.status}
                  </TableCell>
                  <TableCell>
                    {row.order && (
                      <Button type='submit' component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                        {row.order}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {this.renderActions(row.id, row.status, row.order)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

export default Waiter;