import React from 'react';

import styles from './ArrowButton.module.scss';

const ArrowButton = ({ isRight = false, callback, className }) => {
  return (
    <div
      onKeyPress={() => callback()}
      callback={() => callback()}
      role="button"
      tabIndex={0}
      className={className}
    >
      <svg
        className={styles.arrowIcon}
        aria-hidden="true"
        onClick={() => callback()}
        width="46px"
        height="46px"
        viewBox="0 0 46 46"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Arrow icon</title>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Group">
            <g
              id={styles.background}
              fill="white"
              fillOpacity="0.2"
              fillRule="nonzero"
            >
              <circle id="Oval" cx="23" cy="23" r="23" />
            </g>
            <g
              id={styles.arrow}
              transform={
                isRight
                  ? 'translate(20.000000, 17.000000)'
                  : 'translate(23.000000, 23.000000) scale(-1, 1) translate(-23.000000, -23.000000) translate(20.000000, 17.000000)'
              }
              stroke="white"
            >
              <polyline id="Path" points="0 0.5 5.5 6 0 11.5" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ArrowButton;
