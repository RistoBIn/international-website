import React from 'react';
import { Link } from 'gatsby';
import styles from './LinkButtons.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';

const LinkButtons = ({ buttons }) => {
  return (
    <div className={styles.wrap}>
      {buttons.map((item, i) => {
        if (i % 2 === 0) {
          return (
            <Link to={item.buttonLink} className="button is-primary">
              <span>{item.buttonTxt}</span>
              <span className="icon is-small">
                <ArrowRight />
              </span>
            </Link>
          );
        }
        return (
          <Link to={item.buttonLink} className="button is-third">
            <span>{item.buttonTxt}</span>
            <span className="icon is-small">
              <ArrowRight />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default LinkButtons;
