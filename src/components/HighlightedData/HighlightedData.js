import React from 'react';
import styles from './HighlightedData.module.scss';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();
const HighlightedData = ({ highlighted, id }) => {
  if (
    !highlighted ||
    highlighted.length < 1 ||
    !highlighted[0].heading ||
    !highlighted[0].description
  )
    return <></>;
  return (
    <section className="section has-dark-background" id={id}>
      <div className="container">
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
};

const HighlightedSpec = ({ heading, description }) => (
  <div className={styles.highlighted__specification}>
    <p className={styles.highlighted__specification__title}>{heading}</p>
    <p className={styles.highlighted__specification__description}>
      {description}
    </p>
  </div>
);

export default HighlightedData;
