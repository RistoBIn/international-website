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
}) => {
  if (!image || !image.childImageSharp) return <></>;
  return (
    <section className={classNames(styles.section, className)}>
      <div className="container">
        <NonStretchedImage
          fluid={image.childImageSharp.fluid}
          objectFit="contain"
          alt=""
          className={classNames('image', styles.image)}
        />
        <SplittedSection leftColumn={leftColumn} rightColumn={rightColumn} />
      </div>
    </section>
  );
};

export default LargeImageWithSplitContent;
