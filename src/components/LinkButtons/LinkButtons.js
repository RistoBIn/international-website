import React from 'react';
import { Link } from 'gatsby';
import styles from './LinkButtons.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';

const LinkButtons = ({data}) => {
	return(
		<div className={styles.wrap}>
			{
				data.map((item, i)=>{
					if (i%2===0) {
						return(
							<button className="button is-primary">
								<Link to={item.buttonLink}>
						      <div className="button-text">{item.buttonTxt}</div>
						      <div className="icon is-small">
						        <ArrowRight />
						      </div>
						    </Link>
					    </button>
						)
					} else {
						return(
							<button className="button is-third">
								<Link to={item.buttonLink}>
						      <div className="button-text">{item.buttonTxt}</div>
						      <div className="icon is-small">
						        <ArrowRight />
						      </div>
						    </Link>
							</button>
						)
					}
					
				})
			}
		</div>
	)
}

export default LinkButtons
