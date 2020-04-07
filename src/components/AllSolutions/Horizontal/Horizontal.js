import React from 'react';
// import classNames from 'classnames';
// import styles from './Horizontal.module.scss';
import ImageBoxesWithNavigation from '../../ImageBoxesWithNavigation';

const Horizontal = props => {
  const {
    items,
    heading = 'These are the industries you will find SEALAB products',
    buttonText = 'Contact us',
    buttonPath = '/contact/',
  } = props;

  if (
    !items ||
    items.length < 1 ||
    !items[0].node ||
    !items[0].node.frontmatter ||
    !items[0].node.fields
  )
    return <></>;
  const itemsFormatted = items.map(item => {
    const { heading: itemHeading, featuredimage } = item.node.frontmatter;

    return {
      featuredimage,
      heading: itemHeading,
      path: item.node.fields.slug,
    };
  });
  return (
    <ImageBoxesWithNavigation
      items={itemsFormatted}
      heading={heading}
      buttonPath={buttonPath}
      buttonText={buttonText}
    />
  );
};

export default Horizontal;
