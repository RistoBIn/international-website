import React, { useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './ImageBoxesWithNavigation.module.scss';
import Button from '../Button';
import ArrowButton from '../ArrowButton';
import useArrayNavigation from '../../hooks/useArrayNavigation';
import { idMaker } from '../../utils/id-maker';
import BackgroundImage from '../BackgroundImage';
import CarouselItem from './CarouselItem';

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
    !items[0].featuredimage ||
    !items[0].heading ||
    !items[0].path
  )
    return <></>;
  const { next, previous, activeIndex } = useArrayNavigation(items);

  return (
    <>
      <section className={classNames('section', 'has-dark-background')}>
        <div className={classNames('container', styles.section)}>
          <h2 className={styles.heading}>{heading}</h2>

          <Button
            className={classNames('button', 'is-primary', 'large', styles.cta)}
            text={buttonText}
            path={buttonPath}
          />
          <div className={styles.carousel__navigation}>
            <ArrowButton
              className={styles.carousel__navigation__icon}
              callback={() => next()}
            />
            <ArrowButton
              className={styles.carousel__navigation__icon}
              isRight
              callback={() => previous()}
            />
          </div>

          <Carousel items={items} activeIndex={activeIndex} />
        </div>
      </section>
    </>
  );
};

const Carousel = ({ items, activeIndex }) => {
  const resolveGridColumnNumber = index => {
    let resolvedGridColumnNumber = index + activeIndex + 1;
    if (resolvedGridColumnNumber < 1)
      resolvedGridColumnNumber = items.length - 1;
    if (resolvedGridColumnNumber > items.length) resolvedGridColumnNumber = 0;
    return resolvedGridColumnNumber;
  };

  return (
    <div className={classNames('wrapper', styles.carousel)}>
      {items.map((item, index) => {
        const { heading, path, featuredimage } = item;
        return (
          <CarouselItem
            className={classNames()}
            key={gen.next().value}
            heading={heading}
            path={path}
            featuredimage={featuredimage}
            index={index}
            activeIndex={activeIndex}
            style={{ gridColumn: resolveGridColumnNumber(index), gridRow: '1' }}
          />
        );
      })}
    </div>
  );
};

export default ImageBoxesWithNavigation;
