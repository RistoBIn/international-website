import React from 'react';
import styled from 'styled-components';
import CheckMark from '../../img/check-icon.svg';

const Wrapper = styled.div`
	margin-top: 66px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto;
	grid-column-gap: 80px;
	grid-row-gap: 25px;
	@media(max-width: 600px) {
		margin-top: 55px;
		grid-template-columns: repeat(1, 1fr);
	}
`
const CheckItem = styled.div`
	background: linear-gradient(270deg, rgba(69, 183, 210, 0) 0%, #226CC7 100%);
	border-radius: 40px;
	display: flex;
	align-items: center;
	font-weight: 600;
	font-size: 16px;
	line-height: 100%;
	& img {
		padding: 15px 13px;
		margin-right: 10px;
		border-radius: 20px;
		background: rgba(255, 255, 255, 0.1);
	}
`
const CheckList = ({data}) => {
	if (!data || data.length < 1) {
    return <></>;
  }
  console.log(data)
  return (
    <Wrapper >
      {
      	data.map(item=>(
					<CheckItem>
						<img src={CheckMark} />{item.feature}
					</CheckItem>
      	))
      }
    </Wrapper>
  );
}

export default CheckList