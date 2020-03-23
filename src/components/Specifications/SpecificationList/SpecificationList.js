import React from 'react';
import styles from './SpecificationList.module.scss';

const SpecificationList = ({ list }) => (
  <section
    className="section has-dark-background"
    id={styles.specificationList}
  >
    <div className="container">
      <div className={styles.list}>
        {list.map(spec => (
          <ListItem heading={spec.heading} description={spec.description} />
        ))}
      </div>
    </div>
  </section>
);

const ListItem = ({ heading, description }) => {
  let printDescription = description;
  if (!description) {
    printDescription = <CheckMark />;
  }

  return (
    <div className={styles.list__item}>
      <p className={styles.list__item__heading}>{heading}</p>
      <p className={styles.list__item__description}>{printDescription}</p>
    </div>
  );
};

const CheckMark = () => (
  <svg
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 7.5L5.5 12L16.5 1" stroke="white" strokeWidth="2" />
  </svg>
);

export default SpecificationList;
