import React from 'react';
import classNames from 'classnames';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styles from './Hero.module.scss';
import BackgroundImage from '../BackgroundImage';

const ArrowDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.46967 11.5303C5.76256 11.8232 6.23744 11.8232 6.53033 11.5303L11.3033 6.75736C11.5962 6.46447 11.5962 5.98959 11.3033 5.6967C11.0104 5.40381 10.5355 5.40381 10.2426 5.6967L6 9.93934L1.75736 5.6967C1.46447 5.40381 0.989593 5.40381 0.696699 5.6967C0.403806 5.98959 0.403806 6.46447 0.696699 6.75736L5.46967 11.5303ZM5.25 3.27835e-08L5.25 11L6.75 11L6.75 -3.27835e-08L5.25 3.27835e-08Z"
      fill="white"
    />
  </svg>
);

const Hero = ({
  heading,
  subheading,
  backgroundImage,
  backgroundCSS,
  buttonText,
  buttonPath,
  anchorLink,
  className,
}) => {
  if (!backgroundImage) return <></>;

  const Button = () => {
    if (anchorLink) {
      return (
        <AnchorLink
          href={anchorLink}
          className={classNames('is-link', styles.button)}
        >
          <span>{buttonText}</span>
          <span className={classNames('icon', 'is-small', styles.button__icon)}>
            <ArrowDown />
          </span>
        </AnchorLink>
      );
    }
    return (
      <Button
        className={classNames('is-primary', styles.button)}
        text={buttonText}
        path={buttonPath}
      />
    );
  };
  return (
    <BackgroundImage
      className={classNames('hero', styles.hero, className)}
      image={backgroundImage}
      style={{
        backgroundPosition: 'bottom center !important',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{ background: backgroundCSS }}
        className={classNames(styles.content, 'hero-body')}
      >
        <div className="container">
          <div>
            <h1 className={styles.content__heading}>{heading}</h1>
            <p className={classNames(styles.content__subheading)}>
              {subheading}
            </p>
            <Button />
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Hero;
