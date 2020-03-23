import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import styles from './Link.module.scss';
import ArrowRight from '../../img/Arrow.inline.svg';

const LinkComp = ({ className, children, to }) => {
  return (
    <Link to={to} className={classNames(styles.link, className, 'link')}>
      <span>{children}</span>
      <span className="icon is-small">
        <ArrowRight />
      </span>
    </Link>
  );
};

export default LinkComp;
