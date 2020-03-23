import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';
import classNames from 'classnames';
import styles from './ArticleTile.module.scss';
import 'moment/locale/nb';

const Article = ({ title, image, date, path, keyName, outerClass }) => (
  <Link key={keyName} to={path} className={classNames('column', outerClass)}>
    <div className={styles.tile}>
      <Img className={styles.image} fluid={image} />
      <div className={styles.tileContent}>
        <p className={styles.date}>{`${moment(date)
          .locale('nb')
          .calendar()}`}</p>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  </Link>
);

export default Article;
