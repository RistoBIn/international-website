import React from 'react';
import styles from './CurrentTimeline.module.scss';
import { getDigitalTime } from '../../../utils/date';
import EventText from '../TimelineText';
import { idMaker } from '../../../utils/id-maker';

const gen = idMaker();

const CurrentTimeline = ({ heading, event }) => {
  if (!heading || !event || !event.friendlyName) return <></>;
  const {
    friendlyName,
    state,
    start_time: startTime,
    stop_time: endTime,
  } = event;

  const calculateProgress = () => {
    return 0.4;
  };

  const friendlyStartTime = getDigitalTime(startTime);
  const friendlyEndTime = getDigitalTime(endTime);
  return (
    <div className={styles.currentTimeline}>
      {heading}
      <TimeLine times={['00.00', '00.30', '01:00', '01:30']} />
      <div className={styles.progress}>
        <div
          style={{ width: `${calculateProgress() * 100}%` }}
          className={styles.progress__bar}
        />
        <EventText
          startTime={friendlyStartTime}
          endTime={friendlyEndTime}
          heading={friendlyName}
          camName={state.camera}
          isActive
        />
      </div>
    </div>
  );
};

export const TimeLine = ({ times }) => {
  if (!times && typeof times[0] !== 'string') return <></>;
  return (
    <div
      className={styles.timeline}
      style={{ gridTemplateColumns: `repeat(${times.length}, [col] 1fr)` }}
    >
      {times.map(time => (
        <div key={gen.next().value} className={styles.timeline__time}>
          <p>{time}</p>
        </div>
      ))}
    </div>
  );
};

export default CurrentTimeline;
