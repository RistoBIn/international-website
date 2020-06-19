import React from 'react';
import classNames from 'classnames';
import styles from './SideImageSection.module.scss';
import SplittedSection from '../SplittedSection';
import NonStretchedImage from '../NonStretchedImage';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';
import ButtonsList from '../Button/ButtonsList';

const SideImageSection = ({ sectionData }) => {
  const PostContent = HTMLContent || Content;

  if (!sectionData || sectionData.length < 1) return <></>;

  if (sectionData.imageSide === 'left') {
    return (
      <section className="section has-dark-background">
        <div className="container content">
          <SplittedSection
            className="section content has-dark-background"
            leftColumn={
              <NonStretchedImage
                objectFit="contain"
                alt=""
                className="image"
                {...sectionData.featuredimage}
              />
            }
            rightColumn={
              <>
                {sectionData.subheading ? (
                  <p className="section--subheading no-margin">
                    {sectionData.subheading}
                  </p>
                ) : (
                  <></>
                )}
                <h2 className="section--title no-margin">
                  {sectionData.heading}
                </h2>
                <PostContent
                  className="content"
                  content={generateHTML(sectionData.content)}
                />
                <ButtonsList buttons={sectionData.linkButtons} />
              </>
            }
            leftColumnCSS={classNames(styles.automargin, 'automargin')}
          />
        </div>
      </section>
    );
  }
  if (sectionData.imageSide === 'right') {
    return (
      <section className="section has-dark-background">
        <div className="container content">
          <SplittedSection
            shouldReorderOnMobile
            className="section content has-dark-background"
            leftColumn={
              <>
                {sectionData.subheading ? (
                  <p className="section--subheading">
                    {sectionData.subheading}
                  </p>
                ) : (
                  <></>
                )}
                <h2 className="section--title no-margin">
                  {sectionData.heading}
                </h2>
                <PostContent
                  className="content"
                  content={generateHTML(sectionData.content)}
                />
                <ButtonsList buttons={sectionData.buttonList} />
              </>
            }
            rightColumn={
              <NonStretchedImage
                objectFit="contain"
                alt=""
                className="image"
                {...sectionData.featuredimage}
              />
            }
            rightColumnCSS={classNames(styles.automargin, 'automargin')}
          />
        </div>
      </section>
    );
  }
  return <></>;
};

export default SideImageSection;
