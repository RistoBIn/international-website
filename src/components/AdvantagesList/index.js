import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image'

const Wrap = styled.div`
	margin-top: 42px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	.gatsby-image-wrapper {
		max-width: 92px;
		width: 100%;
		margin: auto;
	}
	p {
		text-align: center;
		margin-top: 55px;
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 140%;
	}
	@media(max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
		grid-row-gap: 20px;
		p {
			max-width: 191px;
			margin: 55px auto 0;
		}
	}
`
const AdvantageItem = styled.div`
  padding: 10px 30px;
  border-left: ${props=>props.bl};
  @media(max-width: 768px) {
  	border-left: 0px;
  }
`

const AdvantagesList = ({advantages}) => (
	<Wrap>
		{
			advantages.map((item, i)=>{
				return(
					<AdvantageItem key={i} bl={i===0?"none":"1px solid rgba(255, 255, 255, 0.2)"} >
						<Img fluid={item.featuredimage.childImageSharp.fluid} />
						<p>{item.advantage}</p>
					</AdvantageItem>
				)
			})
		}
	</Wrap>
)

export default AdvantagesList