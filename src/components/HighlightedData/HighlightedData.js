import React from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';
import classNames from 'classnames';

import styles from './HighlightedData.module.scss';
import { idMaker } from '../../utils/id-maker';
import ZigZagBackground from '../../img/horizontal-zig-zag.svg';
import ZigZagBackgroundMobile from '../../img/horizontal-zig-zag-mobile.svg';

const Highlighted = styled.section`
  background-image: url(${ZigZagBackgroundMobile});
  background-position: center 10%;
  background-repeat: no-repeat;
  background-repeat-x: repeat;
  @media only screen and (min-width: 768px) {
    background-size: contain;
    background-image: url(${ZigZagBackground});
    background-repeat: no-repeat;
  }
`;

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
    <section className="has-dark-background" id={id}>
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
    <Highlighted style={{}} className={styles.highlighted__specification}>
      <CountUp
        className={classNames(
          styles.highlighted__specification__title,
          'highlighted-specification',
        )}
        prefix={keyNumberBefore}
        suffix={keyNumberAfter}
        delay={4}
        duration={10}
        end={keyNumber}
        style={{}}
      />
      <p className={styles.highlighted__specification__description}>
        {description}
      </p>
    </Highlighted>
  );
};

export default HighlightedData;
