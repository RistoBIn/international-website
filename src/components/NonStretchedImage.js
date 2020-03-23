import React from 'react';
import Img from 'gatsby-image';

const NonStretchedImage = props => {
  let normalizedProps = props;
  /* eslint-disable */
    if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: '0 auto', // Used to center the image
        maxHeight: '100%',
      },
    };
  }
  if (!props.fluid && props.publicURL)
    return <img src={props.publicURL} alt={props.alt} className={props.className} />;

  return <Img {...normalizedProps} />;
};

export default NonStretchedImage;
