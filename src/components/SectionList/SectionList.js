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
        console.log(item);

        return (
          <section className={classNames('section', 'has-dark-background')}>
            <div className="container content">
              <SplittedSection
                leftColumn={<TitleAndImage {...item} />}
                rightColumn={
                  <PostContent content={generateHTML(item.content)} />
                }
                className=""
              />
            </div>
          </section>
        );
      })}
    </>
  );
};

const TitleAndImage = ({ heading, subheading, image }) => {
  const SubheadingResolved = () => {
    if (subheading)
      return <p className={classNames(styles.subheading)}>{subheading}</p>;
    return <></>;
  };
  const ImageResolved = () => {
    if (image && typeof image === 'object')
      return (
        <NonStretchedImage
          objectFit="contain"
          alt=""
          className="image"
          {...image}
        />
      );
    return <></>;
  };
  return (
    <>
      <SubheadingResolved />
      <h2 className={classNames(styles.heading)}>{heading}</h2>
      <ImageResolved />
    </>
  );
};

export default SectionList;
