import React from 'react';
import classNames from 'classnames';
import styles from './SectionList.module.scss';
import SplittedSection from '../SplittedSection';
import NonStretchedImage from '../NonStretchedImage';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';

const SectionList = ({ items }) => {
  if (!items || items.length < 1 || !items[0].content || !items[0].heading)
    return <></>; // Heading and content is required

  const PostContent = HTMLContent || Content;
  return (
    <>
      {items.map(item => {
        return (
          <section
            className={classNames(
              'section',
              'has-dark-background',
              styles.section,
            )}
          >
            <div className="container content">
              <SplittedSection
                leftColumnCSS={styles.leftColumn}
                leftColumn={
                  <TitleAndImage {...item} className={styles.leftColumn} />
                }
                rightColumn={
                  <PostContent content={generateHTML(item.content)} />
                }
                rightColumnCSS={styles.rightColumn}
                className={styles.content}
              />
            </div>
          </section>
        );
      })}
    </>
  );
};

const TitleAndImage = ({ heading, subheading, featuredimage, className }) => {
  const SubheadingResolved = () => {
    if (subheading)
      return <p className={classNames(styles.subheading)}>{subheading}</p>;
    return <></>;
  };
  const ImageResolved = () => {
    if (featuredimage && typeof featuredimage === 'object')
      return (
        <NonStretchedImage
          objectFit="contain"
          alt={heading}
          className={classNames('image', styles.image)}
          {...featuredimage}
        />
      );
    return <></>;
  };
  return (
    <div className={className}>
      <SubheadingResolved />
      <h2 className={classNames(styles.heading)}>{heading}</h2>
      <ImageResolved />
    </div>
  );
};

export default SectionList;
