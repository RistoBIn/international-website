import React from 'react';
import classNames from 'classnames';
import styled, { keyframes } from 'styled-components';
import styles from './PercentageItems.module.scss';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';
import { idMaker } from '../../utils/id-maker';
import PercentageIcon from '../../img/percentage-icon.inline.svg';

const gen = idMaker();

const PercentageItems = ({ items, className }) => {
  if (!items || items.length < 1 || !items[0].content || !items[0].percentage)
    return <></>;
  const PostContent = HTMLContent || Content;

  return (
    <>
      <div id="key-factors" className={classNames(styles.wrapper, className)}>
        {items.map(item => {
          return (
            <div key={gen.next().value} className={styles.percentageItem}>
              <div className={styles.percentageBar}>
                {/* <PercentageIcon /> */}
                <WrappedPercentageIcon percentage={item.percentage} />
              </div>
              <PostContent
                content={generateHTML(item.content)}
                className={classNames(styles.content, 'content')}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const getKeyFrameDataUsage = () => {
  return keyframes`
  0% {
    stroke-dasharray: 0 160;
  }
  `;
};

const SVGDiv = styled.div`
  #data-usage-icon {
    display: block;

    #green--circle {
      animation: ${getKeyFrameDataUsage} 1.35s;
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      transform: rotate(-90deg);
      transform-origin: center;

      stroke-linecap: butt;
    }
  }
`;

const WrappedPercentageIcon = ({ percentage }) => (
  <SVGDiv>
    <svg
      width="102px"
      height="102px"
      viewBox="0 0 102 102"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Percent Icon</title>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="small-percent-icon" transform="translate(1.000000, 1.000000)">
          <circle
            id="Oval"
            stroke="#7BB7EF"
            strokeWidth="5"
            opacity="0.3"
            cx="50"
            cy="50"
            r="49.1071429"
          />
          <circle
            id="Oval"
            stroke="#7BB7EF"
            strokeWidth="8"
            strokeDasharray={
              (((2 * 20) / 7) * (percentage * 100),
              (((2 * 20) / 7) * (percentage * 100) * 60) / 100)
            }
            // strokeDasharray="50 102"
            cx="50"
            cy="50"
            r="47.3214286"
          />
          <text
            id="60%"
            fontFamily="Ubuntu-Bold, Ubuntu"
            fontSize="23"
            fontWeight="bold"
            fill="#FFFFFF"
          >
            <tspan x="26.379" y="59">
              {`${(percentage * 100).toFixed(0)}%`}{' '}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  </SVGDiv>
);

export default PercentageItems;
