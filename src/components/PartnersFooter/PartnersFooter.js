import React from 'react';
import classNames from 'classnames';
import styles from './PartnersFooter.module.scss';
import NonStretchedImage from '../NonStretchedImage';

const PartnersFooter = ({ partners, className }) => {
  return (
    <div id="partners-footer" className={classNames(className, styles.wrapper)}>
      <hr className={styles.hrLine}></hr>
      <h3 className={styles.header}>{partners.heading}</h3>
      <div id="partners" className="columns partnerContainer">
        {partners.partnerItems.map(partner => (
          <div className="column partnerItem">
            <figure className={styles.image}>
              <NonStretchedImage
                objectFit="contain"
                alt=""
                className="image"
                {...partner.icon}
              />
            </figure>
            <p className={styles.partnerDescription}>{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersFooter;
