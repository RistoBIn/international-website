import React from 'react';
import styles from './NextEvent.module.scss';
import TimelineText from '../TimelineText';
import { getDigitalTime } from '../../../utils/date';

const NextEvent = ({ heading, event }) => {
  if (!heading || !event || !event.friendlyTitleName_en) return <></>;
  const {
    friendlyTitleName_en: friendlyTitleName,
    friendlyCameraName_en: friendlyCameraName,
    start_time: startTime,
    stop_time: endTime,
  } = event;
  const friendlyStartTime = getDigitalTime(startTime);
  const friendlyEndTime = getDigitalTime(endTime);
  return (
    <div className={styles.event}>
      {heading}

      <div className={styles.event__item}>
        <TimelineText
          startTime={friendlyStartTime}
          endTime={friendlyEndTime}
          heading={friendlyTitleName}
          camName={friendlyCameraName}
        />
      </div>
    </div>
  );
};

export default NextEvent;
