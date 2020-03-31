import React from 'react';
import classNames from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import styles from './BackgroundImage.module.scss';

const BackgroundImageSection = ({
  image,
  className,
  id,
  children,
  style,
  cssFilter,
}) => {
  if (image && image.childImageSharp && image.childImageSharp.fluid) {
    if (cssFilter)
      return (
        <BackgroundImage
          Tag="section"
          className={classNames(className, styles.image__section)}
          fluid={image.childImageSharp.fluid}
          style={style}
          id={id}
        >
          <div className={styles.filter} style={{ background: cssFilter }}>
            {children}
          </div>
        </BackgroundImage>
      );
    return (
      <BackgroundImage
        Tag="section"
        className={classNames(className, styles.image__section)}
        fluid={image.childImageSharp.fluid}
        style={style}
        id={id}
      >
        {children}
      </BackgroundImage>
    );
  }

  if (image && image.publicURL)
    return (
      <section
        id={id}
        className={classNames(className)}
        style={{
          backgroundImage: `url(${image.publicURL})`,
        }}
      >
        {children}
      </section>
    );
  return <></>;
};

export default BackgroundImageSection;
