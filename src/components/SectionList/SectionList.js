import React from 'react';
import classNames from 'classnames';
import { useMedia } from 'react-use';
import useWindowWidth from '../../hooks/useWindowWidth';
import TextWithCTA from '../TextWithCTA';
import styles from './SectionList.module.scss';
import NonStretchedImage from '../NonStretchedImage';

function isEven(n) {
  return n % 2 === 0;
}
const SectionList = ({ items, className }) => {
  if (!items || items.length < 1 || !items[0]) return <></>;
  return (
    <section
      className={classNames('section', 'has-dark-background', className)}
    >
      <div className="container">
        {items.map((section, index) => (
          <SectionItem
            heading={section.heading}
            description={section.description}
            alignLeft={isEven(index)}
            isRight={isEven(index)}
          >
            <NonStretchedImage
              fluid={section.img.childImageSharp.fluid}
              objectFit="contain"
              alt={section.subheading}
              className="image"
            />
          </SectionItem>
        ))}
      </div>
    </section>
  );
};

const SectionItem = ({ isRight, children, heading, description }) => {
  const isMobile = useMedia('(max-width: 600px');
  const windowWidth = useWindowWidth();
  if (isRight || isMobile || windowWidth < 600)
    return (
      <div className="columns">
        <div className={classNames('column', 'is-6', styles.image)}>
          {children}
        </div>
        <div
          className={classNames(
            'column',
            'is-6',
            styles.section__item__content,
          )}
        >
          <TextWithCTA heading={heading} description={description} />
        </div>
      </div>
    );
  return (
    <div className="columns">
      <div
        className={classNames('column', 'is-6', styles.section__item__content)}
      >
        <TextWithCTA heading={heading} description={description} />
      </div>
      <div className={classNames('column', 'is-6', styles.image)}>
        {children}
      </div>
    </div>
  );
};

export default SectionList;
