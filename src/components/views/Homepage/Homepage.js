import React from 'react';
import styles from './Homepage.module.scss';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const demoBooking = [
  {
    id: 1,
    date: '2021-02-22',
    hour: '12:30',
    table: 1,
    ppl: 3,
    starters: ['salad'],
    order: 'local',
  },
  {
    id: 2,
    date: '2021-02-21',
    hour: '16:00',
    table: 3,
    ppl: 2,
    starters: ['bread', 'lemonWater'],
    order: 'local',
  },
  {
    id: 3,
    date: '2021-02-21',
    hour: '12:00',
    table: '#',
    ppl: '#',
    starters: ['pizza'],
    order: 'Delivery',
  },  
];

const Homepage = () => {

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
          {demoBooking.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>
                {row.table}
              </TableCell>
              <TableCell>
                {row.hour}
              </TableCell>
              <TableCell>
                {row.ppl}
              </TableCell>
              <TableCell>
                {row.starters.map(val => val + '; ')}
              </TableCell>
              <TableCell>
                {row.order}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Homepage;