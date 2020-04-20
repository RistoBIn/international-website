import React from 'react';
import classNames from 'classnames';
import BackgroundImage from '../BackgroundImage';
import styles from './HeroBackgroundImageFaded.module.scss';

const Hero = ({ className, image, children, style }) => {
  return (
    <>
      <BackgroundImage
        className={classNames('hero', className)}
        image={image}
        filterStyle={{
          background:
            'linear-gradient(358.35deg, #0E111B 4.06%, rgba(14, 17, 27, 0.21) 34.1%), linear-gradient(0deg, rgba(14, 17, 27, 0.3), rgba(14, 17, 27, 0.3))',
        }}
        style={{ backgroundPosition: 'bottom center !important', ...style }}
      >
        <div className={classNames('hero-body')}>{children}</div>
      </BackgroundImage>
    </>
  );
};

export default Hero;
