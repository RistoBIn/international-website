import React from 'react';
import classNames from 'classnames';
import styles from './FeaturesList.module.scss';

const FeaturesList = ({ features }) => {
  if (!features || features.length < 1) return <></>;
  return (
    <>
      <div className={styles.wrapper}>
        {features.map(feature => {
          const { publicURL } = feature.icon;
          return (
            <FeatureItem
              icon={publicURL}
              heading={feature.heading}
              key={feature.heading}
            />
          );
        })}
      </div>
    </>
  );
};

const FeatureItem = ({ icon, heading }) => (
  <div className={styles.featureItem}>
    <figure className="image">
      <img className={styles.icon} src={icon} alt={heading} />
    </figure>
    <p className={classNames(styles.heading)}> {heading} </p>
  </div>
);

export default FeaturesList;
