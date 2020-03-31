import React from 'react';
import classNames from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import styles from './BackgroundImage.module.scss';

const BackgroundImageSection = ({ image, className, id, children }) => {
  if (image && image.childImageSharp && image.childImageSharp.fluid)
    return (
      <BackgroundImage
        Tag="section"
        className={classNames(className, styles.image__section)}
        fluid={image.childImageSharp.fluid}
      >
        {children}
      </BackgroundImage>
    );
  if (image.publicURL)
    return (
      <section
        className={classNames(className)}
        style={{
          background: `linear-gradient(358.35deg, #0E111B 4.06%, rgba(14, 17, 27, 0.21) 34.1%), linear-gradient(0deg, rgba(14, 17, 27, 0.3), rgba(14, 17, 27, 0.3)), url(${image.publicURL})`,
        }}
      >
        {children}
      </section>
    );
  return <></>;
};

export default BackgroundImageSection;
