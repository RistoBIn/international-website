import React from 'react';
import classNames from 'classnames';
import styles from './CurrentTimeline.module.scss';

const CurrentTimeline = ({ heading, event }) => {
  return (
    <div className={styles.currentTimeline}>
      <h3>{heading}</h3>

      <progress className={classNames(styles.progress)} max="100" value="80" />
    </div>
  );
};

export default CurrentTimeline;
