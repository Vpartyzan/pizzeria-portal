import React from 'react';
import styles from './Waiter.module.scss';

import { Link } from 'react-router-dom';

const Waiter = () => {

  return (
    <div className={styles.component}>
      <h2>Waiter view</h2>
      <nav>
        <li><Link to={`${process.env.PUBLIC_URL}/waiter/order/new`}>New order</Link></li>
        <li><Link to={`${process.env.PUBLIC_URL}/waiter/order/123`}>Ordering</Link></li>
      </nav>
    </div>
  );
};

export default Waiter;