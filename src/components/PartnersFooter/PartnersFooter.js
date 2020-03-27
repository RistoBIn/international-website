import React from 'react';
import classNames from 'classnames';
import styles from './PartnersFooter.module.scss';
import NonStretchedImage from '../NonStretchedImage';

const PartnersFooter = ({ partners, className }) => {
  if (
    !partners ||
    !partners.heading ||
    !partners.partnerItems ||
    partners.partnerItems.length < 1 ||
    !partners.partnerItems[0].icon
  )
    return <></>;
  return (
    <div id="partners-footer" className={classNames(className, styles.wrapper)}>
      <hr className={styles.hrLine} />
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
            {partner.description ? (
              <p className={styles.partnerDescription}>{partner.description}</p>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersFooter;
