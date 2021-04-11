import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Order.module.scss';

const Order = () => {
  const { id } = useParams();

  return (
    <div className={styles.component}>
      <h2>Order view {id}</h2>
    </div>
  );
};

export default Order;