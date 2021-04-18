import React from 'react';
import styles from './Kitchen.module.scss';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const demoOrder = [
  {
    id: 1,
    time: '12:30',
    product: 'pizza',    
    table: 1,
    params: ['Sauce', 'Red peppers', 'Green peppers', 'Mushrooms', 'Fresh basil', 'Salami'],       
  },
  {
    id: 2,
    time: '12:40',
    product: 'salad',    
    table: 3,
    params: ['Cucumber', 'Tomatoes', 'Olives', 'Fresh herbs'],        
  },
];

const Kitchen = () => {
  const [checked, setChecked] = React.useState([]);

  const handleChange = (id) => {    
    setChecked(val => (val.indexOf(id) !== -1) ? val.filter(v => v !== id) : [...val, id]);
  };

  return (
    <Paper className={styles.component}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Product</TableCell>          
            <TableCell>Table</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoOrder.map(row =>{
            const isCheckboxChecked = checked.indexOf(row.id) !== -1;

            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  {row.time}
                </TableCell>
                <TableCell>
                  {row.product}
                </TableCell>
                <TableCell>
                  {row.table}
                </TableCell>
                <TableCell>
                  {row.params.map(val=> val + '; ')}
                </TableCell>
                <TableCell>
                  <Checkbox
                    id={String(row.id)}
                    checked={isCheckboxChecked}
                    onClick={ () => handleChange(row.id)}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </TableCell>
              </TableRow>
            );            
          })}
        </TableBody>
      </Table>  
    </Paper>
  );
};

export default Kitchen;