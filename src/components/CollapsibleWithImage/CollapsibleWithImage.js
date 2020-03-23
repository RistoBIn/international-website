import React, { useState } from 'react';
import classNames from 'classnames';
import Collapsible from 'react-collapsible';

import styles from './CollapsibleWithImage.module.scss';

const CollapsibleWithImage = ({ collapsibleItems, children, className }) => {
  if (!collapsibleItems || collapsibleItems.length < 1 || !children) {
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
              <CollapsibleItem
                heading={item.heading}
                description={item.description}
              />
            ))}
          </div>

          <div
            className={classNames(
              'column',
              'is-6',
              'image-full-width',
              styles.image,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

const CollapsibleItem = ({ heading, description }) => {
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
          <p
            className={classNames(
              'medium-paragraph',
              styles.collapsibleDescription,
            )}
          >
            {description}
          </p>
        </Collapsible>
        <hr />
      </div>
    </>
  );
};

export default CollapsibleWithImage;
