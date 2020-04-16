import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Schedule.module.scss';
import CurrentTimeLine from './CurrentTimeline';
import NextEvent from './NextEvent';
import Program from './Program';
import fetchFromResourceApi from '../../utils/bluethink-resourcefile-api'
import dummyData from './dummyData.json';

const Slideshow = () => {
  const [currentSchedule, setCurrentSchedule] = useState(undefined);
  const [currentEvent, setCurrentEvent] = useState(undefined);
  const getCurrrentEvent = async schedule => {
    let i = 0;
    let elemStartTime;
    let elemStopTime;
    const now = new Date();
    while (i < schedule.length) {
      elemStartTime = new Date(Date.parse(schedule[i].start_time));
      elemStopTime = new Date(Date.parse(schedule[i].stop_time));
      if (elemStartTime < now && elemStopTime > now) {
        return schedule[i];
      }
      i += 1;
    }
    return undefined;
  };

  async function fetchSchedule() {
    const apiResponse = await fetchFromResourceApi(
      `/site-info/livestream-schedules/c1be1ead-81dc-4202-80b2-ab0b4beb5778/2020-04-15.json`,
    );
    setCurrentSchedule(apiResponse.data);
  }

  useEffect(() => {
    if (typeof currentSchedule === 'undefined') {
      fetchSchedule();
    }
    if (typeof currentSchedule !== 'undefined') {
      const theEvent = getCurrrentEvent(currentSchedule);
      setCurrentEvent(theEvent);
    }
    console.log('type: ', typeof currentSchedule);
    console.log('Current event: ', cusrrentEvent);
  }, [currentSchedule, currentEvent]);
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
