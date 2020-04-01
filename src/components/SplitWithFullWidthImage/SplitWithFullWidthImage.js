import React from 'react';
import classNames from 'classnames';
import BackgroundImage from '../BackgroundImage';
import styles from './SplitWithFullWidthImage.module.scss';

const SplitWithFullWidthImage = ({
  splitSectionImage,
  children,
  id,
  className,
}) => {
  if (!splitSectionImage || !children) return <></>;
  return (
    <section id={id} className={classNames('section', className)}>
      <BackgroundImage
        htmlTag="div"
        className={classNames(
          styles.backgroundImage,
          styles.hidden__tablet_up,
          'wrapper-two-split',
        )}
        image={splitSectionImage}
        cssFilter="linear-gradient(177.9deg, #0E111B 0%, rgba(14, 17, 27, 0.61) 27.24%), linear-gradient(0deg, rgba(14, 17, 27, 0.21), rgba(14, 17, 27, 0.21))"
      >
        {children}
      </BackgroundImage>
      <div className="wrapper-two-split">
        <BackgroundImage
          htmlTag="div"
          className={classNames('bg-image', styles.hidden__mobile_only)}
          image={splitSectionImage}
        />

        <div className={classNames(styles.hidden__mobile_only)}>{children}</div>
      </div>
    </section>
  );
};

export default SplitWithFullWidthImage;
