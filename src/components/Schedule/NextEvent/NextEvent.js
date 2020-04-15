import React from 'react';
import styles from './NextEvent.module.scss';

const NextEvent = ({ heading }) => {
  return (
    <div className={styles.NextEvent}>
      <h3>{heading}</h3>
    </div>
  );
};

export default NextEvent;
