import React from 'react';
import styles from './CurrentTimeline.module.scss';

const CurrentTimeline = ({ heading }) => {
  return (
    <div className={styles.currentTimeline}>
      <h3>{heading}</h3>
    </div>
  );
};

export default CurrentTimeline;
