import React from 'react';
import classNames from 'classnames';
import styles from './EventText.module.scss';
import CameraIcon from '../../../img/camera.inline.svg';

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

export default EventText;
