import React from 'react';
import classNames from 'classnames';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styles from './Hero.module.scss';
import ArrowDown from '../../img/angle-down.inline.svg';

const Hero = ({
  heading,
  subheading,
  backgroundImage,
  buttonText = 'Kontakt oss',
  buttonPath = '/kontakt',
}) => {
  return (
    <>
      <section
        className={classNames(
          'hero',
          'has-background',
          'is-medium',
          styles.hero,
        )}
        style={{
          background: `linear-gradient(180deg, #0E111B 0%, rgba(14, 17, 27, 0.5) 100%), url(${backgroundImage})`,
        }}
      >
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className={styles.heading}>{heading}</h1>
            <p className={classNames('big-paragraph', styles.subheading)}>
              {subheading}
            </p>
            <AnchorLink
              href={buttonPath}
              className={classNames('is-primary', 'button', styles.button)}
            >
              <span>{buttonText}</span>
              <span className="icon is-small">
                <ArrowDown />
              </span>
            </AnchorLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
