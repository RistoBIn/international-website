import React from 'react';
import classNames from 'classnames';
import styles from './ImageBoxesWithNavigation.module.scss';
import Button from '../Button';
import ArrowButton from '../ArrowButton';
import useArrayNavigation from '../../hooks/useArrayNavigation';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();

const ImageBoxesWithNavigation = ({
  items,
  heading,
  buttonText,
  buttonPath,
}) => {
  if (
    !items ||
    items.length < 1 ||
    !items[0].featuredimage.publicURL ||
    !items[0].heading ||
    !items[0].path
  )
    return <></>;
  const { next, previous, activeIndex } = useArrayNavigation(items);
  console.log(items[activeIndex]);

  return (
    <>
      <section className="section has-dark-background">
        <heading>
          <h2 className={styles.heading}>{heading}</h2>
          <div className={styles.buttons}>
            <Button
              className={classNames(
                'button',
                'is-primary',
                'large',
                styles.button,
              )}
              text={buttonText}
              path={buttonPath}
            />
            <div className={styles.button_navigation}>
              <ArrowButton
                className={styles.button_navigation__icon}
                callback={() => previous()}
              />
              <ArrowButton
                className={styles.button_navigation__icon}
                isRight
                callback={() => next()}
              />
            </div>
          </div>
        </heading>
        <Carousel items={items} activeIndex={activeIndex} />
      </section>
    </>
  );
};

const Carousel = ({ items, activeIndex }) => {
  return (
    <div className={classNames('wrapper', styles.carousel)}>
      {items.map((item, index) => {
        const { heading, path, featuredimage } = item;
        return (
          <CarouselItem
            className={classNames({
              [styles.carousel__item__active]: index === activeIndex,
            })}
            key={gen.next().value}
            heading={heading}
            path={path}
            featuredimage={featuredimage}
          />
        );
      })}
    </div>
  );
};

const CarouselItem = ({ heading, featuredimage, path }) => (
  <div
    style={{ backgroundImage: `url(${featuredimage.publicURL})` }}
    className={styles.carousel__item}
  >
    <h3>{heading}</h3>
    <Button
      className="button is-transparent"
      buttonText="Read more"
      buttonPath={path}
    />
  </div>
);

export default ImageBoxesWithNavigation;
