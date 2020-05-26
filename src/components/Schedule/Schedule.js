import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Schedule.module.scss';
import CurrentTimeLine from './CurrentTimeline';
import NextEvent from './NextEvent';
import Program from './Program';
import { fetchFromResourceApi } from '../../utils/bluethink-resourcefile-api';

const Slideshow = () => {
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
    async function fetchSchedule() {
      const apiResponse = await fetchFromResourceApi(
        `/site-info/livestream-schedules/${process.env.GATSBY_UID}/${currentDate}.json`,
      );
      if (!apiResponse || !apiResponse.data) {
        return;
      }
      setCurrentSchedule(apiResponse.data);
    }
    fetchSchedule();
  }, [currentDate]);

  useEffect(() => {
    function updateCurrrentEvent() {
      if (typeof currentSchedule === 'undefined') {
        return;
      }
      let i = 0;
      let elemStartTime;
      let elemStopTime;
      const now = new Date();
      while (i < currentSchedule.length) {
        elemStartTime = new Date(Date.parse(currentSchedule[i].start_time));
        elemStopTime = new Date(Date.parse(currentSchedule[i].stop_time));
        if (elemStartTime < now && elemStopTime > now) {
          const eventDuration = elemStopTime.getTime() - now.getTime();
          setTimeout(() => {
            updateCurrrentEvent();
          }, eventDuration);
          setCurrentEvent(i);
          return;
        }
        i += 1;
      }
      setCurrentEvent(undefined);
    }
    updateCurrrentEvent();
  }, [currentSchedule]);

  return (
    <section className={classNames(styles.scheduleWrapper)}>
      <CurrentTimeLine
        heading={
          <h3 className={styles.timeline__heading}>Currently streaming</h3>
        }
        event={currentSchedule[currentEvent]}
        className={classNames(styles.currentTimeline)}
      />
      <NextEvent
        heading={<h3 className={styles.timeline__heading}>Coming up next</h3>}
        event={
          currentEvent === currentSchedule.length
            ? undefined
            : currentSchedule[currentEvent + 1]
        }
        className={classNames(styles.nextEvent)}
      />
      <Program
        events={currentSchedule.slice(currentEvent + 2)}
        heading="Upcoming events"
        className={classNames(styles.program)}
      />
    </section>
  );
};

export default Slideshow;
