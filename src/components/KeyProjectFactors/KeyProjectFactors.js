import React from 'react';
import classNames from 'classnames';
import styles from './KeyProjectFactors.module.scss';

// const KeyProjectFeatures = ({ features }) => {
//   if (!features || features.length < 1) return <></>;
//   return (
//     <>
//       <div className={styles.wrapper}>
//         {features.map(feature => {
//           const { publicURL } = feature.icon;
//           return (
//             <FeatureItem
//               icon={publicURL}
//               heading={feature.heading}
//               key={feature.heading}
//             />
//           );
//         })}
//       </div>
//     </>
//   );
// };
const KeyProjectFactors = ({ keyFactors }) => {
  return (
    <>
      <div id="key-factors" className={styles.wrapper}>
        <h5 className={styles.heading} >{keyFactors.heading}</h5>
        {keyFactors.factorItems.map(factor => (
          <div className={styles.factorItem}>
            <p className={styles.description}> {factor.description} </p>
            <p className={styles.primaryInfo}> {factor.primaryInfo} </p>
          </div>
        ))}
      </div>
    </>
  );
};
// const FeatureItem = ({ icon, heading }) => (
//   <div className={styles.featureItem}>
//     <figure className="image">
//       <img className={styles.icon} src={icon} alt={heading} />
//     </figure>
//     <p className={classNames(styles.heading)}> {heading} </p>
//   </div>
// );

//            <figure className="image">
//              <img
//                src={factor.icon.publicURL}
//                alt="Icon"
//                className={styles.icon}
//              />
//            </figure>

export default KeyProjectFactors;
