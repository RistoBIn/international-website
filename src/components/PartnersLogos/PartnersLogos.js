import React from 'react';
import classNames from 'classnames';
import InnovasjonNorge from '../../img/Logos/innovasjon-norge.png';
import Forskningsradet from '../../img/Logos/forskningsradet.png';
import NorskAkkreditering from '../../img/Logos/Kiwa+NA_MSYS004_no.svg';
import iso9001 from '../../img/Logos/9001.svg';
import iso14001 from '../../img/Logos/14001.svg';
import azure from '../../img/Logos/azure.png';
import sintef from '../../img/Logos/sintef.svg';
import ntnu from '../../img/Logos/ntnu.svg';
import styles from './PartnersLogos.module.scss';

const partners = [
  {
    img: NorskAkkreditering,
    alt: 'NorskAkkreditering',
    className: styles.logoRectangular,
  },
  {
    img: InnovasjonNorge,
    alt: 'InnovasjonNorge',
    className: styles.logoRectangular,
  },
  {
    img: Forskningsradet,
    alt: 'Forskningsradet',
    width: '100%',
    className: styles.logoRectangular,
  },
  {
    img: azure,
    alt: 'Microsoft Azure',
    className: styles.logoRectangular,
  },
  {
    img: sintef,
    alt: 'SINTEF',
    className: styles.logoRectangular,
  },
  {
    img: ntnu,
    alt: 'NTNU',
    className: styles.logoRectangular,
  },
  {
    img: iso9001,
    alt: 'iso9001',
    className: styles.logoSquare,
  },
  {
    img: iso14001,
    alt: 'iso9001',
    className: styles.logoSquare,
  },
];

const PartnersLogos = () => (
  <>
    <section id="partners" className="section">
      <div className="container">
        <div className={classNames(styles.wrapper)}>
          {partners.map(partner => (
            <Logo
              key={partner.img}
              img={partner.img}
              alt={partner.alt}
              className={partner.className}
            />
          ))}
        </div>
      </div>
    </section>
  </>
);

const Logo = ({ img, alt, className }) => (
  <div className={classNames(styles.box)} style={{ margin: 'auto' }}>
    <figure className="image">
      <img
        alt={alt}
        src={img}
        className={className}
        style={{ margin: 'auto' }}
      />
    </figure>
  </div>
);

export default PartnersLogos;
