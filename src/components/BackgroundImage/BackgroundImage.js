import React from 'react';
import classNames from 'classnames';
import BackgroundImage from 'gatsby-background-image';

const BackgroundImageSection = ({
  image,
  className,
  id,
  children,
  style,
  filterStyle,
  htmlTag,
}) => {
  if (image && image.childImageSharp && image.childImageSharp.fluid) {
    if (filterStyle)
      return (
        <BackgroundImage
          Tag={htmlTag || 'section'}
          className={classNames(className)}
          fluid={image.childImageSharp.fluid}
          style={{ ...style }}
          id={id}
        >
          <div
            style={{
              height: '102%',
              width: '100%',
              ...filterStyle,
            }}
          >
            {children}
          </div>
        </BackgroundImage>
      );

    return (
      <BackgroundImage
        Tag={htmlTag || 'section'}
        className={classNames(className)}
        fluid={image.childImageSharp.fluid}
        style={{ ...style }}
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
          ...style,
        }}
      >
        {children}
      </section>
    );
  console.error('Check props for BackgroundImage');
  return <></>;
};

export default BackgroundImageSection;
