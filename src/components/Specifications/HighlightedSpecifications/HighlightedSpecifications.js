import React from 'react';
import styles from './HighlightedSpecifications.module.scss';
import { idMaker } from '../../../utils/id-maker';

const gen = idMaker();

const HighlightedSpecifications = ({ highlighted }) => (
  <section className="section has-dark-background" id={styles.highlighted}>
    <div className="container">
      <p className="description--subtitle">
        <strong>Specifications</strong>
      </p>
      <div className={styles.highlighted__wrapper}>
        {highlighted.map(spec => (
          <HighlightedSpec
            key={gen.next().value}
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
