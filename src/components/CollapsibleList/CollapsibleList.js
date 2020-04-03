import React, { useState } from 'react';
import classNames from 'classnames';
import Collapsible from 'react-collapsible';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';

import styles from './CollapsibleList.module.scss';

const CollapsibleList = ({ collapsibleItems, className }) => {
  if (!collapsibleItems || collapsibleItems.length < 1) {
    return <></>;
  }
  return (
    <section
      className={classNames('section', className, styles.collapsibleSection)}
    >
      <div className="container">
        <div className="columns">
          <div
            className={classNames('column', 'is-6', styles.collapsibleColumn)}
          >
            {collapsibleItems.map(item => (
              <CollapsibleItem heading={item.heading} content={item.content} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CollapsibleItem = ({ heading, content }) => {
  const PostContent = HTMLContent || Content;
  const [isOpen, toggleOpen] = useState(false);
  const Header = () => (
    <button
      className={styles.collapsibleButton}
      type="button"
      onClick={() => toggleOpen(!isOpen)}
    >
      <h4>
        <span className={styles.plusMinus}>{isOpen ? '- ' : '+ '}</span>
        {heading}
      </h4>
    </button>
  );
  return (
    <>
      <div className={styles.collapsibleItem}>
        <Collapsible trigger={<Header />}>
          <PostContent
            content={generateHTML(content)}
            className={classNames(
              'medium-paragraph',
              styles.collapsibleContent,
            )}
          />
        </Collapsible>
        <hr />
      </div>
    </>
  );
};

export default CollapsibleList;
