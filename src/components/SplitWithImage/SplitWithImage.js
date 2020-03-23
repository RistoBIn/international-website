import React from 'react';
import classNames from 'classnames';
import TextWithCTA from '../TextWithCTA';
import styles from './SplitWithImage.module.scss';

const SplitWithImage = ({
  heading,
  description,
  buttonPath = '/kontakt',
  buttonText = 'Kontakt oss',
  children,
  className,
}) => {
  if (!heading || !description || !children) return <></>;
  return (
    <section className={classNames('section', className)}>
      <div className="container">
        <div className="columns">
          <div className={classNames('column', 'is-6', styles.image)}>
            {children}
          </div>
          <div className="column is-6">
            <TextWithCTA
              heading={heading}
              description={description}
              buttonPath={buttonPath}
              buttonText={buttonText}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitWithImage;
