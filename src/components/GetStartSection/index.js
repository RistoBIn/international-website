import React from 'react';
import NonStretchedImage from '../NonStretchedImage';
import Button from '../Button';
import { HTMLContent } from '../Content';

const GetStartSection = ({ sectionData }) => {
  if (!sectionData || sectionData.length < 1) return <></>;
  return(
    <section className="section">
      <div className="container">
        <div className="row">
          <NonStretchedImage
            className="is-mobile-hidden"
            publicURL={sectionData.topImage.publicURL}
            extension={sectionData.topImage.extension}
            fluid={sectionData.topImage.childImageSharp.fluid}
          />
          <NonStretchedImage
            className="is-mobile-show"
            publicURL={sectionData.topImage.publicURL}
            extension={sectionData.topImage.extension}
            fluid={sectionData.mobileTopImage.childImageSharp.fluid}
          />
        </div>
        <div className="row center-align-wrapper">
          <br />
          <h2 className="section--title">{sectionData.heading}</h2>
          <HTMLContent content={sectionData.description} />
          <Button
            className="is-primary"
            text={sectionData.buttonTxt}
            path={sectionData.buttonLink}
          />
        </div>
      </div>
    </section>
  )
}

export default GetStartSection