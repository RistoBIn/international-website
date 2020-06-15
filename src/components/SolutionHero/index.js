import React from 'react';
import classNames from 'classnames';
import BackgroundImage from '../BackgroundImage';

const SolutionHero = ({ className, heading, description, image }) => {
  return (
    <div>
      <BackgroundImage
        className={classNames('hero', className)}
        image={image}
        filterStyle={{
          background:
            'linear-gradient(358.35deg, #0E111B 4.06%, rgba(14, 17, 27, 0.21) 34.1%), linear-gradient(0deg, rgba(14, 17, 27, 0.3), rgba(14, 17, 27, 0.3))',
        }}
        style={{
          backgroundPosition: 'bottom center !important',
          minHeight: '320px',
        }}
      >
        <div className={classNames('hero-body is-mobile-hidden')}>
          <div className="container">
            <div className="row">
              <h1>{heading}</h1>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <section className="section is-mobile-show">
        <div className="container">
          <div className="row">
            <h1>{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionHero;
