import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Booking.module.scss';

const Booking = () => {
  const { id } = useParams();

  return (
    <div className={styles.component}>
      <h2>Booking view {id}</h2>      
    </div>
  );
};

export default Booking;