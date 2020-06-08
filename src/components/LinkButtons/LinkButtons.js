import React from 'react';
import { Link } from 'gatsby';
import styles from './LinkButtons.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';

const LinkButtons = ({buttons}) => {
	return(
		<div className={styles.wrap}>
			{
				buttons.map((item, i)=>{
					if (i%2===0) {
						return(
							<button className="button is-primary">
								<Link to={item.buttonLink}>
						      <span>{item.buttonTxt}</span>
						      <span className="icon is-small">
						        <ArrowRight />
						      </span>
						    </Link>
					    </button>
						)
					} else {
						return(
							<button className="button is-third">
								<Link to={item.buttonLink}>
						      <span>{item.buttonTxt}</span>
						      <span className="icon is-small">
						        <ArrowRight />
						      </span>
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
