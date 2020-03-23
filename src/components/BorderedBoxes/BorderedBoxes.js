import React from 'react';
import classNames from 'classnames';
import styles from './BorderedBoxes.module.scss';
import NonStretchedImage from '../NonStretchedImage';
import Title from '../Title';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();
const BorderedBoxes = ({
  heading,
  subheading,
  description,
  boxes,
  className,
}) => {
  if (
    !heading ||
    !description ||
    !boxes ||
    boxes.length < 1 ||
    !boxes[0].image ||
    !boxes[0].description
  )
    return <></>;

  return (
    <section className={classNames('section', className)}>
      <div className="container">
        <Title
          title={heading}
          subtitle={subheading}
          description={description}
          position="center"
        />
        <div className={classNames('wrapper', styles.boxes)}>
          {boxes.map(boxContent => (
            <Box
              image={boxContent.image}
              description={boxContent.description}
              key={gen.next().value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Box = ({ image, description }) => {
  const Image = () => {
    if (!image) return <></>;
    if (image.childImageSharp && image.childImageSharp.fluid)
      return (
        <NonStretchedImage
          fluid={image.childImageSharp.fluid}
          objectFit="contain"
          className={styles.box__image__gatsby}
          alt="Logo"
        />
      );
    if (image.publicURL)
      return (
        <NonStretchedImage
          objectFit="contain"
          alt="Logo"
          className={styles.box__image}
          publicURL={image.publicURL}
        />
      );
    return <></>;
  };
  return (
    <div className={classNames('box', styles.box)}>
      <div className={styles.box__image__wrapper}>
        <Image />
      </div>
      <p className={styles.box__description}>{description}</p>
    </div>
  );
};

export default BorderedBoxes;
