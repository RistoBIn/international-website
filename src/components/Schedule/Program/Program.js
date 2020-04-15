import React from 'react';
import styles from './Program.module.scss';

const Program = ({ heading }) => {
  return (
    <div className={styles.Program}>
      <h3>{heading}</h3>
    </div>
  );
};

export default Program;
