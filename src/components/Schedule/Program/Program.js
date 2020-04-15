import React from 'react';
import styles from './Program.module.scss';
import { getDigitalTime } from '../../../utils/date';
import ClockIcon from '../../../img/clock.inline.svg';
import CameraIcon from '../../../img/camera.inline.svg';

const Program = ({ heading, events }) => {
  if (!heading || !events || events.length < 1) return <></>;
  return (
    <div className={styles.program}>
      <h3>{heading}</h3>
      {events.map(eventItem => {
        console.log(eventItem);

        return (
          <EventItem
            startTime={eventItem.start_time}
            endTime={eventItem.stop_time}
            friendlyName={eventItem.friendlyName}
            cam={eventItem.state.camera}
          />
        );
      })}
    </div>
  );
};

const EventItem = ({ startTime, endTime, friendlyName, cam }) => {
  const friendlyStartTime = getDigitalTime(startTime);
  const friendlyEndTime = getDigitalTime(endTime);
  const duration = '4 hours';
  return (
    <div className={styles.event}>
      <p
        className={styles.event__time}
      >{`${friendlyStartTime} - ${friendlyEndTime}`}</p>
      <h4 className={styles.event__heading}>{friendlyName}</h4>
      <p className={styles.event__duration}>
        <ClockIcon />
        {duration}
      </p>
      <p className={styles.event__cam}>
        <CameraIcon />
        {cam}
      </p>
    </div>
  );
};

export default Program;
