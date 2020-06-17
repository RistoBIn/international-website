import React from 'react';
import styles from './ExperiencesList.module.scss';
import NonStretchedImage from '../NonStretchedImage';

const ExperiencesList = ({ experiences }) => {
  if (!experiences || experiences.length < 1) return <></>;
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default ExperiencesList;
