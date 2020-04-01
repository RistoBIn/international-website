import React from 'react';
import classNames from 'classnames';
import Content, { HTMLContent } from '../Content';
import styles from './QuadSplitSection.module.scss';
import generateHTML from '../../utils/generateHTML';

const QuadSplitSection = ({ contentItems, className, contentItemsCss }) => {
  if (!contentItems || contentItems.length < 1 || !contentItems[0].content)
    return <></>;

  const PostContent = HTMLContent || Content;
  return (
    <section className={classNames(className)}>
      <div className="container">
        <div className={styles.wrapper}>
          {contentItems.map(content => {
            return (
              <div className={classNames(styles.box, contentItemsCss)}>
                <PostContent
                  content={generateHTML(content.content)}
                  className={classNames('content', styles.content)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuadSplitSection;
