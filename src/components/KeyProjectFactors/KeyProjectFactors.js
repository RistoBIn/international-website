import React from 'react';
import styles from './KeyProjectFactors.module.scss';

const KeyProjectFactors = ({ keyFactors }) => {
  return (
    <>
      <div id="key-factors" className={styles.wrapper}>
        <h3 className={styles.heading}>{keyFactors.heading}</h3>
        {keyFactors.factorItems.map(factor => (
          <div className={styles.factorItem}>
            <p className={styles.description}> {factor.description} </p>
            <p className={styles.primaryInfo}> {factor.primaryInfo} </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default KeyProjectFactors;
