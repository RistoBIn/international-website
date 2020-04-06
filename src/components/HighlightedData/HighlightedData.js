import React from 'react';
import CountUp from 'react-countup';

import styles from './HighlightedData.module.scss';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();
const HighlightedData = ({ highlighted, id }) => {
  if (
    !highlighted ||
    highlighted.length < 1 ||
    !highlighted[0].keyNumber ||
    !highlighted[0].description
  )
    return <></>;
  return (
    <section className="section has-dark-background" id={id}>
      <div className="container">
        <div className={styles.highlighted__wrapper}>
          {highlighted.map(spec => (
            <HighlightedSpec key={gen.next().value} {...spec} />
          ))}
        </div>
      </div>
    </section>
  );
};

const HighlightedSpec = ({
  keyNumber,
  description,
  keyNumberBefore,
  keyNumberAfter,
}) => {
  return (
    <div className={styles.highlighted__specification}>
      <CountUp
        className={styles.highlighted__specification__title}
        prefix={keyNumberBefore}
        suffix={keyNumberAfter}
        delay={4}
        duration={10}
        end={keyNumber}
      />
      <p className={styles.highlighted__specification__description}>
        {description}
      </p>
    </div>
  );
};

export default HighlightedData;
