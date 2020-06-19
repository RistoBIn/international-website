import React from 'react';
import styled from 'styled-components';
import NonStretchedImage from '../NonStretchedImage';

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;

  margin-top: 120px;
  & p {
    margin-top: 40px;

    text-align: center !important;
  }

  .gatsby-image-wrapper {
    margin: auto;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 30px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 30px;

    width: 100%;
    max-width: 500px;
    margin: auto;
  }
`;
const ExperiencesList = ({ experiences }) => {
  if (!experiences || experiences.length < 1) return <></>;
  return (
    <Wrap>
      {experiences.map(experience => {
        return (
          <div>
            <NonStretchedImage
              objectFit="contain"
              alt=""
              className="image"
              {...experience.featuredimage}
            />
            <p className="section--subheading">{experience.description}</p>
          </div>
        );
      })}
    </Wrap>
  );
};

export default ExperiencesList;
