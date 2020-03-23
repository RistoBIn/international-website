import React from 'react';
import classNames from 'classnames';
import styles from './BorderedContentSection.module.scss';
import NonStretchedImage from '../NonStretchedImage';

const BorderedContentSection = ({
  sectionHeading,
  heading,
  subheading,
  fluidImage,
  description,
  className,
}) => {
  if (!heading || !description || !fluidImage) return <></>;

  return (
    <section
      id={'BorderedContent'}
      className={classNames('section', 'is-small', className, styles.section)}
    >
      <div className="container">
        {sectionHeading ? (
          <p className={styles.heading}>{sectionHeading}</p>
        ) : (
          <></>
        )}

        <div className={classNames('wrapper', styles.wrapper)}>
          <div className={classNames('box', styles.wrapper__image)}>
            <NonStretchedImage
              fluid={fluidImage}
              objectFit="contain"
              alt={subheading}
            />
          </div>
          <div className={classNames('box', styles.wrapper__content)}>
            <p className={styles.wrapper__content__subheading}>{subheading}</p>
            <h2 className={styles.wrapper__content__heading}>{heading}</h2>
            <p className={styles.wrapper__content__description}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BorderedContentSection;
