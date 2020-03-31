import React from 'react';
import classNames from 'classnames';
import styles from './QuadSplitSection.module.scss';

const QuadSplitSection = ({
  topRowLeftColumn,
  topRowLeftColumnCSS,
  topRowRightColumn,
  topRowRightColumnCSS,
  bottomRowLeftColumn,
  bottomRowLeftColumnCSS,
  bottomRowRightColumn,
  bottomRowRightColumnCSS,
  className,
  shouldReorderOnMobile = false,
}) => {
  if (
    !topRowLeftColumn ||
    !topRowRightColumn ||
    !bottomRowLeftColumn ||
    !bottomRowRightColumn
  )
    return <></>;
  return (
    <section className={classNames(className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <div
            className={classNames(styles.leftColumn, topRowLeftColumnCSS, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {topRowLeftColumn}
          </div>
          <div
            className={classNames(styles.rightColumn, topRowRightColumnCSS, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {topRowRightColumn}
          </div>
        </div>
        <div className={styles.wrapper}>
          <div
            className={classNames(styles.leftColumn, bottomRowLeftColumnCSS, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {bottomRowLeftColumn}
          </div>
          <div
            className={classNames(styles.rightColumn, bottomRowRightColumnCSS, {
              [styles.switchColumnsOnMobile]: shouldReorderOnMobile,
            })}
          >
            {bottomRowRightColumn}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuadSplitSection;
