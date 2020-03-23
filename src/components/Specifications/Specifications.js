import React, { useState } from 'react';
import classNames from 'classnames';
import HighlightedSpecifications from './HighlightedSpecifications';
import SpecificationList from './SpecificationList';
import styles from './Specifications.module.scss';

const isSpecificationArray = array => {
  if (
    !array ||
    array.length < 1 ||
    !array[0] ||
    !array[0].heading ||
    !array[0].description
  )
    return false;
  return true;
};

const Specifications = ({ highlighted, all }) => {
  const [isSpecOpen, setSpecOpen] = useState(false);
  if (!isSpecificationArray(highlighted) && !isSpecificationArray(all))
    return <></>;
  if (!isSpecificationArray(highlighted) && isSpecificationArray(all))
    return <SpecificationList list={all} />;
  if (isSpecificationArray(highlighted) && !isSpecificationArray(all))
    return <HighlightedSpecifications highlighted={highlighted} />;

  const ButtonContent = () => {
    if (!isSpecOpen)
      return (
        <span>
          Alle spesifikasjoner <Arrow />
        </span>
      );
    return (
      <span>
        Lukk spesifikasjoner <Arrow isArrowDown />
      </span>
    );
  };
  return (
    <>
      <HighlightedSpecifications highlighted={highlighted} />

      {isSpecOpen ? <SpecificationList list={all} /> : <></>}
      <section
        className={classNames('section', 'has-dark-background', styles.section)}
      >
        <div className="container">
          <button
            type="button"
            className={classNames('button', 'is-secondary', styles.button)}
            onClick={() => setSpecOpen(!isSpecOpen)}
          >
            <ButtonContent />
          </button>
        </div>
      </section>
    </>
  );
};

const Arrow = ({ isArrowDown }) => {
  if (isArrowDown)
    return (
      <svg
        width="9"
        height="10"
        viewBox="0 0 9 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.85355 0.146446C4.65829 -0.0488157 4.34171 -0.0488157 4.14645 0.146446L0.964466 3.32843C0.769204 3.52369 0.769204 3.84027 0.964466 4.03553C1.15973 4.2308 1.47631 4.2308 1.67157 4.03553L4.5 1.20711L7.32843 4.03553C7.52369 4.2308 7.84027 4.2308 8.03553 4.03553C8.2308 3.84027 8.2308 3.52369 8.03553 3.32843L4.85355 0.146446ZM5 9.5L5 0.5L4 0.5L4 9.5L5 9.5Z"
          fill="#141826"
        />
      </svg>
    );
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.14645 9.85355C4.34171 10.0488 4.65829 10.0488 4.85355 9.85355L8.03553 6.67157C8.2308 6.47631 8.2308 6.15973 8.03553 5.96447C7.84027 5.7692 7.52369 5.7692 7.32843 5.96447L4.5 8.79289L1.67157 5.96447C1.47631 5.7692 1.15973 5.7692 0.964466 5.96447C0.769204 6.15973 0.769204 6.47631 0.964466 6.67157L4.14645 9.85355ZM4 0.5L4 9.5L5 9.5L5 0.5L4 0.5Z"
        fill="#0E111B"
      />
    </svg>
  );
};

export default Specifications;
