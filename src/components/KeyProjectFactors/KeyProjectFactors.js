import React from 'react';
import classNames from 'classnames';
import styles from './KeyProjectFactors.module.scss';

const KeyProjectFactors = ({ keyFactors }) => {
  return (
    <>
      <div id="key-factors" className={styles.wrapper}>
        <h5 className={styles.heading} >{keyFactors.heading}</h5>
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
