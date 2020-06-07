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
`
const AdvantageItem = styled.div`
  padding: 10px 30px;
  border-left: ${props=>props.bl};
`

const AdvantagesList = ({data}) => (
	<Wrap>
		{
			data.map((item, i)=>{
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