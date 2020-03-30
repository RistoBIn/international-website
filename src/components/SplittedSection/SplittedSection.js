import React from 'react';
import classNames from 'classnames';
import styles from './SplittedSection.module.scss';

const SplittedSection = ({
  leftColumn,
  leftColumnCSS,
  rightColumn,
  rightColumnCSS,
  className,
  shouldReorderOnMobile = false,
}) => {
  if (!leftColumn || !rightColumn) return <></>;
  return (
    <section className={classNames(className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div
            className={classNames(styles.leftColumn, leftColumnCSS, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {leftColumn}
          </div>
          <div
            className={classNames(styles.rightColumn, rightColumnCSS, {
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
