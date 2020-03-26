import React from 'react';
import classNames from 'classnames';
import styles from './ComparisonSection.module.scss';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();

const ComparisonSection = ({
  heading,
  subheading,
  item1,
  item2,
  className,
}) => {
  if (
    !heading ||
    !item1 ||
    !item1.heading ||
    !item1.items ||
    !item2.heading ||
    !item2.items
  )
    return <></>;
  return (
    <section className={classNames('section', className)}>
      <div className="container">
        <div className={styles.wrapper}>
          <ComparisonItem
            className={styles.item1}
            items={item1.items}
            heading={item1.heading}
          />

          <MainBox
            heading={heading}
            subheading={subheading}
            topImage={item1.featuredimage}
            bottomImage={item2.featuredimage}
          />

          <ComparisonItem
            className={styles.item2}
            items={item2.items}
            heading={item2.heading}
          />
        </div>
      </div>
    </section>
  );
};

const ComparisonItem = ({ heading, items, className }) => {
  return (
    <div className={classNames(styles.comparison__item, className)}>
      <h3 className={classNames(styles.comparison__item__heading)}>
        {heading}
      </h3>
      <ul className={styles.comparison__item__list}>
        {items.map(itemString => (
          <li
            className={classNames(
              'paragraph',
              styles.comparison__item__list_item,
            )}
            key={gen.next().value}
          >
            {itemString}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MainBox = ({ heading, subheading, topImage, bottomImage }) => {
  if (!topImage.publicURL || !bottomImage.publicURL) return <></>;
  return (
    <div className={classNames(styles.main__item)}>
      <img
        className={classNames(styles.main__item__image, 'image')}
        src={topImage.publicURL}
        alt=""
      />
      <h2 className={styles.main__item__heading}>{heading}</h2>
      <p className={classNames('paragraph', styles.main__item__subheading)}>
        {subheading}
      </p>
      <img
        className={classNames(styles.main__item__image, 'image')}
        src={bottomImage.publicURL}
        alt=""
      />
    </div>
  );
};

export default ComparisonSection;
