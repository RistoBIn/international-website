import React from 'react';
import Img from 'gatsby-image';

const NonStretchedImage = props => {
  let normalizedProps = props;

  /* eslint-disable */
  if (props.childImageSharp && props.childImageSharp.fluid && props.childImageSharp.fluid.presentationWidth) {
    return <Img fluid={props.childImageSharp.fluid} className={props.className? props.className : 'image'} style={{maxWidth: props.childImageSharp.fluid.presentationWidth}} />;
  }
  if (props.fluid && !props.fluid.presentationWidth) {
     return <Img fluid={props.fluid} className={props.className? props.className : 'image'} />;
  }
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: '0 auto', // Used to center the image
      },
    };
    return <Img {...normalizedProps} />;
  }
  if (!props.fluid && props.publicURL) {
    return (
      <img src={props.publicURL} alt={props.alt} className={props.className} />
    );
  } else if (props.extension && props.extension === 'svg') {
    <img src={props.publicURL} alt={props.alt} className={props.className} />
  }

  return <Img {...normalizedProps} />;
};

export default NonStretchedImage;
