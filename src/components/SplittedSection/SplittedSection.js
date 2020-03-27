import React from 'react';
import classNames from 'classnames';
import styles from './SplittedSection.module.scss';

const SplittedSection = ({
  leftColumn,
  rightColumn,
  className,
  shouldReorderOnMobile = false,
}) => {
  if (!leftColumn || !rightColumn) return <></>;
  return (
    <section className={classNames('section', className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div
            className={classNames(styles.leftColumn, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {leftColumn}
          </div>
          <div
            className={classNames(styles.rightColumn, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {rightColumn}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplittedSection;
