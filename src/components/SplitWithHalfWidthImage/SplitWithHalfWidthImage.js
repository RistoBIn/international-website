import React from 'react';
import classNames from 'classnames';
import styles from './SplitWithHalfWidthImage.module.scss';

const SplitWithHalfWidthImage = ({
  leftColumn,
  leftColumnCSS,
  rightColumn,
  rightImage,
  leftImage,
  rightColumnCSS,
  className,
  shouldReorderOnMobile = false,
}) => {
  if ((!leftColumn & !rightImage) || (!rightColumn && !rightImage)) return <></>;
  return (
    <section className={classNames(className)}>
      <div className="container-fluid">
        <div className={styles.wrapper}>
          <div className={classNames(styles.leftColumn, leftColumnCSS, { [styles.switchColumnsOnMobile]: shouldReorderOnMobile,})}>
            {leftImage}
            <div class={classNames(styles.container)}>
                {leftColumn}
            </div>
          </div>
          <div className={classNames(styles.rightColumn, rightColumnCSS, { [styles.switchColumnsOnMobile]: shouldReorderOnMobile,})}>
            { rightColumn ?
            <div class={classNames(styles.container)}>
                {rightColumn}
            </div> : <></>
            }

            {rightImage}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SplitWithHalfWidthImage;
