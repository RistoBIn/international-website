import React from 'react';
import classNames from 'classnames';
import styles from './TextWithCTA.module.scss';
import Button from '../Button';

const TextWithCTA = ({ heading, description, buttonText, buttonPath }) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={classNames(styles.description, 'big-paragraph')}>
        {description}
      </p>
      {buttonText ? (
        <Button text={buttonText} link={buttonPath} className="is-primary" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TextWithCTA;
