import React from 'react';
import classNames from 'classnames';
import styles from './TextWithCTA.module.scss';

const TextWithCTA = ({ heading, description, buttonText, buttonUrl }) => {
  const ButtonExternalLink = () => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classNames('button', 'is-transparent', styles.button)}
      href={buttonUrl}
    >
      {buttonText}
    </a>
  );

  return (
    <>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={classNames(styles.description, 'big-paragraph')}>
        {description}
      </p>
      <ButtonExternalLink />
    </>
  );
};

export default TextWithCTA;
