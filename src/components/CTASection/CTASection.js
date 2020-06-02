import React from 'react';
import classNames from 'classnames';
import styles from './CTASection.module.scss';
import Button from '../Button';

const CTASection = ({
  heading,
  buttonText = 'Contact',
  buttonPath = '/contact/',
}) => {
  return (
    <section
      className={classNames('section', 'zig-zag-background', styles.cta)}
    >
      <div className={classNames('container', 'centered', styles.container)}>
        <h2 className={styles.heading}>{heading}</h2>
        <Button className="is-primary" text={buttonText} path={buttonPath} />
      </div>
    </section>
  );
};

export default CTASection;
