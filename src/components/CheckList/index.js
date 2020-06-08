import React from 'react';
import styled from 'styled-components';
import CheckMark from '../../img/check-icon.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 80px;
  grid-row-gap: 25px;

  margin-top: 66px;
  @media (max-width: 600px) {
    margin-top: 55px;
    grid-template-columns: repeat(1, 1fr);
  }
`;
const CheckItem = styled.div`
  display: flex;
  align-items: center;

  background: linear-gradient(270deg, rgba(69, 183, 210, 0) 0%, #226cc7 100%);
  border-radius: 40px;

  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  & img {
    margin-right: 10px;
    padding: 15px 13px;

    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }
`;
const CheckList = ({ features }) => {
  if (!features || features.length < 1) {
    return <></>;
  }
  return (
    <Wrapper>
      {features.map(item => (
        <CheckItem>
          <img src={CheckMark} alt={item.feature} />
          {item.feature}
        </CheckItem>
      ))}
    </Wrapper>
  );
};

export default CheckList;
