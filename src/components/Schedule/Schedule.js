import React from 'react';
import classNames from 'classnames';
import styles from './Schedule.module.scss';
import CurrentTimeLine from './CurrentTimeline';
import NextEvent from './NextEvent';
import Program from './Program';
import dummyData from './dummyData.json';

const Slideshow = () => {
  return (
    <section className={classNames(styles.scheduleWrapper)}>
      <CurrentTimeLine
        heading={
          <h3 className={styles.timeline__heading}>Currently streaming</h3>
        }
        event={dummyData[0]}
        className={classNames(styles.currentTimeline)}
      />
      <NextEvent
        heading={<h3 className={styles.timeline__heading}>Coming up next</h3>}
        event={dummyData[1]}
        className={classNames(styles.nextEvent)}
      />
      <Program
        events={dummyData}
        heading="TV Schedule"
        className={classNames(styles.program)}
      />
    </section>
  );
};

export default Slideshow;
