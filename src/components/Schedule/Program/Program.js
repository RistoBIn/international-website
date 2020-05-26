import React from 'react';
import classNames from 'classnames';
import styles from './Program.module.scss';
import { getDigitalTime, getDuration } from '../../../utils/date';
import ClockIcon from '../../../img/clock.inline.svg';
import CameraIcon from '../../../img/camera.inline.svg';
import { idMaker } from '../../../utils/id-maker';

const gen = idMaker();

const Program = ({ className, heading, events }) => {
  if (!heading || !events || events.length < 1) return <></>;
  return (
    <div className={classNames(styles.program, className)}>
      <h3>{heading}</h3>
      {events.map(eventItem => {
        return (
          <EventItem
            key={gen.next().value}
            startTime={eventItem.start_time}
            endTime={eventItem.stop_time}
            friendlyName={eventItem.friendlyName}
            cam={eventItem.friendlyCameraName}
          />
        );
      })}
    </div>
  );
};

const EventItem = ({ startTime, endTime, friendlyName, cam }) => {
  const friendlyStartTime = getDigitalTime(startTime);
  const friendlyEndTime = getDigitalTime(endTime);

  const start = new Date(Date.parse(startTime)).getTime();
  const stop = new Date(Date.parse(endTime)).getTime();
  const duration = getDuration(stop - start);
  return (
    <div className={styles.event}>
      <p
        className={styles.event__time}
      >{`${friendlyStartTime} - ${friendlyEndTime}`}</p>
      <h4 className={styles.event__heading}>{friendlyName}</h4>
      <div className={styles.event__duration}>
        <ClockIcon />
        <p>{duration}</p>
      </div>
      <div className={styles.event__cam}>
        <CameraIcon />
        <p>{cam}</p>
      </div>
    </div>
  );
};

export default Program;
