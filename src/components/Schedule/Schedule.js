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
        heading="Currently streaming"
        event={dummyData[0]}
        className={classNames(styles.currentTimeline)}
      />
      <NextEvent
        heading="Coming up next"
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
