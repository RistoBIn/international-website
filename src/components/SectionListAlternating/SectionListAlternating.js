import React from 'react';
import classNames from 'classnames';
import styles from './SectionListAlternating.module.scss';
import NonStretchedImage from '../NonStretchedImage';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';
import { idMaker } from '../../utils/id-maker';
import Button from '../Button';

const gen = idMaker();

const SectionListAlternating = ({ sections, id, className }) => {
  if (
    !sections ||
    sections.length < 1 ||
    !sections[0].description ||
    !sections[0].featuredimage
  )
    return <></>; // featuredimage and content is required

  return (
    <div id={id}>
      {sections.map((item, index) => {
        return (
          <section
            key={gen.next().value}
            className={classNames(className, styles.section, {
              [styles.isOdd]: index % 2,
            })}
          >
            <div className="container">
              <div className={styles.wrapper}>
                <ContentColumn
                  content={item.description}
                  button={item.button}
                />
                <NonStretchedImage
                  objectFit="contain"
                  alt=""
                  className={classNames('image', styles.image)}
                  {...item.featuredimage}
                />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

const ContentColumn = ({ content, button, className }) => {
  const PostContent = HTMLContent || Content;
  const ContentResolved = () => {
    if (content)
      return (
        <PostContent content={generateHTML(content)} className="content" />
      );
    return <></>;
  };
  const ButtonResolved = () => {
    if (button && button.text && button.path)
      return (
        <Button className="is-primary" text={button.text} path={button.path} />
      );
    return <></>;
  };
  return (
    <div className={classNames(className, styles.content)}>
      <ContentResolved />
      <ButtonResolved />
    </div>
  );
};

export default SectionListAlternating;
