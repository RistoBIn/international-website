import React from 'react';
import classNames from 'classnames';
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
              fluid={experience.featuredimage.childImageSharp.fluid}
              publicURL={experience.featuredimage.publicURL}
              extension={experience.featuredimage.extension}
            />
            <p className="section--subheading">
              {experience.description}
            </p>
          </div>
        )
      })}
    </div>
  )
};

export default ExperiencesList;
