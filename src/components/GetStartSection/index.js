import React from 'react';
import NonStretchedImage from '../NonStretchedImage';
import Button from '../Button';
import { HTMLContent } from '../Content';

const GetStartSection = ({ sectionData }) => {
  if (!sectionData || sectionData.length < 1) return <></>;

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="is-mobile-hidden"
            {...sectionData.topImage}
          />
          <NonStretchedImage
            objectFit="contain"
            alt=""
            className="is-mobile-show"
            {...sectionData.topImage}
          />
        </div>
        <div className="row center-align-wrapper">
          <br />
          <h2 className="section--title">{sectionData.heading}</h2>
          <HTMLContent content={sectionData.description} />
          <Button className="is-primary" {...sectionData} />
        </div>
      </div>
    </section>
  );
};

export default GetStartSection;
