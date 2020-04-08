import React, { useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './CarouselItem.module.scss';
import BackgroundImage from '../../BackgroundImage';

const CarouselItem = ({
  heading,
  featuredimage,
  path,
  className,
  style,
  backgroundImageStyle,
}) => {
  const [isHovering, setHovering] = useState(false);
  const getBackgroundCSS = () => {
    if (isHovering) return ``;
    return `linear-gradient(0deg, rgba(14, 17, 27, 0.5), rgba(14, 17, 27, 0.5))`;
  };
  return (
    <Link
      to={path}
      style={style}
      className={classNames(styles.carousel__item, className, {
        [styles.carousel__item__active]: isHovering,
      })}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <BackgroundImage
        image={featuredimage}
        htmlTag="div"
        className={classNames(styles.carousel__item, className, {
          [styles.carousel__item__active]: isHovering,
        })}
        style={{
          backgroundPosition: 'bottom center !important',

          ...backgroundImageStyle,
        }}
        filterStyle={{ background: getBackgroundCSS(), display: 'table' }}
      >
        <div className={styles.carousel__item__content}>
          <h3 className={classNames(styles.carousel__item__heading)}>
            {heading}
          </h3>
          <div
            aria-hidden="true"
            className={classNames(
              'button',
              'is-transparent',
              styles.carousel__item__button,
            )}
          >
            Read more
          </div>
        </div>
      </BackgroundImage>
    </Link>
  );
};

export default CarouselItem;
