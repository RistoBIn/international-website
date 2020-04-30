import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import styles from './Hero.module.scss';

const Hero = ({
  className,
  heading,
  subheading,
  children,
  buttonText,
  buttonPath,
  heroId,
}) => {
  return (
    <>
      <section
        className={classNames(className, 'section', 'has-dark-background')}
      >
        <div
          className={classNames(styles.title, 'container', 'has-text-centered')}
        >
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subtitle}>{subheading} </p>
          <Button
            text={buttonText}
            className={classNames('is-primary', styles.button)}
            path={buttonPath}
          />
        </div>
      </section>
      <section id={heroId} className=" has-dark-background">
        <div className="container">{children}</div>
      </section>
    </>
  );
};

export default Hero;
