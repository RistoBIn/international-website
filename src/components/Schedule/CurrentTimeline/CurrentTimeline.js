import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import styles from './CurrentTimeline.module.scss';
import CameraIcon from '../../../img/camera.inline.svg';
import 'moment/locale/nb';

const getDigitalTime = dateObject => {
  return moment(dateObject)
    .locale('nb')
    .format('LT');
};

const CurrentTimeline = ({ heading, event }) => {
  if (!heading || !event || !event.friendlyName) return <></>;
  const {
    friendlyName,
    state,
    start_time: startTime,
    stop_time: endTime,
  } = event;

  const calculateProgress = () => {
    return 0.5;
  };

  const friendlyStartTime = getDigitalTime(startTime);
  const friendlyEndTime = getDigitalTime(endTime);
  return (
    <div className={styles.currentTimeline}>
      <h3>{heading}</h3>

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

export const EventText = ({
  startTime,
  endTime,
  heading,
  camName,
  isActive,
}) => (
  <div className={styles.event__text}>
    <p className={styles.event__text__time}>{`${startTime} - ${endTime}`}</p>
    <h4 className={styles.event__text__heading}>{heading}</h4>
    <p
      className={classNames(styles.event__text__camera, {
        [styles.is__active]: isActive,
      })}
    >
      <CameraIcon />
      {camName}
    </p>
  </div>
);

export default CurrentTimeline;
