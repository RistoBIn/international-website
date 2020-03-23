import React from 'react';
import styles from './HighlightedSpecifications.module.scss';

const HighlightedSpecifications = ({ highlighted }) => (
  <section className="section has-dark-background" id={styles.highlighted}>
    <div className="container">
      <p className="description--subtitle">
        <strong>Spesifikasjoner</strong>
      </p>
      <div className={styles.highlighted__wrapper}>
        {highlighted.map(spec => (
          <HighlightedSpec
            heading={spec.heading}
            description={spec.description}
          />
        ))}
      </div>
    </div>
  </section>
);

const HighlightedSpec = ({ heading, description }) => (
  <div className={styles.highlighted__specification}>
    <p className={styles.highlighted__specification__title}>{heading}</p>
    <p className={styles.highlighted__specification__description}>
      {description}
    </p>
  </div>
);

export default HighlightedSpecifications;
