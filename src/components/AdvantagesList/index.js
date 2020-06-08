import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  margin-top: 62px;
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 92px;
    margin: auto;
  }
  p {
    margin-top: 55px;

    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
  }
  @media (max-width: 768px) {
    margin-top: 40px;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 40px;
    p {
      max-width: 191px;
      margin: 55px auto 0;
    }
  }
`;
const AdvantageItem = styled.div`
  padding: 10px 30px;
  border-left: ${props => props.borderLeft};
  @media (max-width: 768px) {
    padding: 0px;
    border-left: 0px;
    p {
      margin-top: 16px;
    }
  }
`;

const AdvantagesList = ({ advantages }) => (
  <Wrap>
    {advantages.map((item, i) => {
      return (
        <AdvantageItem
          borderLeft={i === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'}
        >
          <Img fluid={item.featuredimage.childImageSharp.fluid} />
          <p>{item.advantage}</p>
        </AdvantageItem>
      );
    })}
  </Wrap>
);

export default AdvantagesList;
