import 'date-fns';
import React from 'react';
import styles from './Tables.module.scss';

import { Link } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';

const demoContent = [
  {id: '1', table: '1', hour: '12:00', status: 'booking'},
  {id: '2', table: '3', hour: '12:30', status: 'event'},
  {id: '3', table: '2', hour: '15:00', status: 'booking'},
  {id: '4', table: '1', hour: '13:30', status: 'event'},
];

const timeArr = [
  { id: '1', time: '12:00'}, 
  { id: '2', time: '12:30'},
  { id: '3', time: '13:30'},
  { id: '4', time: '14:00'},
  { id: '5', time: '14:30'},
  { id: '6', time: '15:00'},
];

const Tables = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const setStatus = (table) => {
    switch (table.status) {
      case 'booking':
        return (
          <Link to={`${process.env.PUBLIC_URL}/tables/booking/${table.id}`}>booking</Link>
        );
      case 'event':
        return (
          <Link to={`${process.env.PUBLIC_URL}/tables/events/${table.id}`}>event</Link>
        );
      default:
        return 'open for booking';
    }
  };

  const setForTable = (val) => {
    return (val.every( v => v == null)) ? 'open for booking' : val;
  };

  return (
    <Paper className={styles.component}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hour</TableCell>
            <TableCell>Table 1</TableCell>
            <TableCell>Table 2</TableCell>
            <TableCell>Table 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeArr.map( row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell>
                {setForTable(demoContent.map( order => {
                  return (order.hour == row.time) 
                    ? (order.table == '1')                   
                      ? setStatus(order) 
                      : 'open for booking'
                    : null;
                }))}
              </TableCell>
              <TableCell>
                {setForTable(demoContent.map( order => {
                  return (order.hour == row.time) 
                    ? (order.table == '2')                   
                      ? setStatus(order) 
                      : 'open for booking'
                    : null;
                }))}
              </TableCell>
              <TableCell>
                {setForTable(demoContent.map( order => {
                  return (order.hour == row.time) 
                    ? (order.table == '3')                   
                      ? setStatus(order) 
                      : 'open for booking'
                    : null;
                }))}
              </TableCell>                          
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justify="space-around" className={styles.btn}>
        <Button 
          type='submit'
          component={Link} 
          className={styles.btn} 
          variant="contained" 
          color="primary"
          to={`${process.env.PUBLIC_URL}/tables/booking/new`}
        >
          New booking
        </Button>
        <Button 
          type='submit'
          component={Link} 
          className={styles.btn} 
          variant="contained" 
          color="primary"
          to={`${process.env.PUBLIC_URL}/tables/events/new`}
        >
          New events
        </Button>
      </Grid>      
    </Paper>
  );
};

export default Tables;