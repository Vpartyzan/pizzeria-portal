import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Events.module.scss';

const Events = () => {
  const { id } = useParams();

  return (
    <div className={styles.component}>
      <h2>Event view {id}</h2>
    </div>
  );
};

export default Events;