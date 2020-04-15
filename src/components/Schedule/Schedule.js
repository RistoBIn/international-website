import React from 'react';
import classNames from 'classnames';
import styles from './Schedule.module.scss';
import 'moment/locale/nb';
import { idMaker } from '../../utils/id-maker';
import CurrentTimeLine from './CurrentTimeline';
import NextEvent from './NextEvent';
import Program from './Program';

const gen = idMaker();

const Slideshow = () => {
  return (
    <section className={classNames(styles.scheduleWrapper)}>
      <CurrentTimeLine
        heading="Currently streaming"
        className={classNames(styles.currentTimeline)}
      />
      <NextEvent
        heading="Coming up next"
        className={classNames(styles.nextEvent)}
      />
      <Program heading="TV Schedule" className={classNames(styles.program)} />
    </section>
  );
};

export default Slideshow;
