import React from 'react';
import classNames from 'classnames';
import SplittedSection from '../SplittedSection';
import styles from './LargeImageWithSplitContent.module.scss';
import NonStretchedImage from '../NonStretchedImage';

const LargeImageWithSplitContent = ({
  leftColumn,
  rightColumn,
  className,
  image,
  subheading,
}) => {
  if (!image || (!image.childImageSharp && !image.publicURL)) return <></>;
  return (
    <section className="section">
      <div className="container">
        <NonStretchedImage
          objectFit="contain"
          alt=""
          className={classNames('image', styles.image)}
          {...image}
        />
        {subheading ? (
          <p className={classNames('section--subheading', styles.subheading)}>{subheading}</p>
        ) : (
          <></>
        )}
        <SplittedSection leftColumn={leftColumn} rightColumn={rightColumn} />
      </div>
    </section>
  );
};

export default LargeImageWithSplitContent;
