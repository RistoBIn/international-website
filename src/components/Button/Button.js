import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './Button.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';
import AngleLeft from '../../img/angle-left.inline.svg';

export const Button = ({ className, text, link }) => {
  return (
    <Link to={link} className={classNames('button', styles.button, className)}>
      <span>{text}</span>
      <span className="icon is-small">
        <ArrowRight />
      </span>
    </Link>
  );
};

export const ButtonBack = ({ className, text, link }) => {
  return (
    <Link to={link} className={classNames('button', styles.button, className)}>
      <span className="icon is-small">
        <AngleLeft />
      </span>
      <span>{text}</span>
    </Link>
  );
};

export default Button;
