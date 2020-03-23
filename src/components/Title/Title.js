import React from 'react';
import classNames from 'classnames';
import styles from './Title.module.scss';

const Title = ({ title, subtitle, description, position }) => {
  const centerClass = styles.titleCenter;
  return (
    <div
      className={classNames({
        [centerClass]: position.toLowerCase() === 'center',
      })}
    >
      {subtitle ? <h3 className={styles.subtitle}>{subtitle}</h3> : <></>}
      <h2 className={styles.title}>{title}</h2>
      {description ? (
        <p className={styles.description}>{description}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Title;
