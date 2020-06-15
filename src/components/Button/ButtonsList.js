import React from 'react';
import Button from './Button';

const ButtonsList = ({buttons}) =>{
	if (!buttons || buttons.length < 1) {
    return <></>;
  }
	return(
		<div className="buttons-wrap">
		  {
		  	buttons.map((item, i)=>{
		  		if (i % 2 === 0) {
		  			return(
		  				<Button
		  				  className="is-primary"
		  				  key={i}
		  				  text={item.buttonTxt}
		  				  path={item.buttonLink}
		  				/>
		  			)
		  		} else {
		  			return(
		  				<Button
		  				  className="is-transparent"
		  				  key={i}
		  				  text={item.buttonTxt}
		  				  path={item.buttonTxt}
		  				/>
		  			)
		  		}
		  	})
		  }
		</div>
	)
}

export default ButtonsList