import React from 'react';
import styles from './Tables.module.scss';

import { Link } from 'react-router-dom';

const Tables = () => {

  return (
    <div className={styles.component}>
      <h2>Tables view</h2>
      <nav>
        <li><Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}>New booking</Link></li>
        <li><Link to={`${process.env.PUBLIC_URL}/tables/bookings/booking/123`}>Booking</Link></li>
        <li><Link to={`${process.env.PUBLIC_URL}/tables/events/new`}>New events</Link></li>
        <li><Link to={`${process.env.PUBLIC_URL}/tables/events/event/123`}>Events</Link></li>
      </nav>
    </div>
  );
};

export default Tables;