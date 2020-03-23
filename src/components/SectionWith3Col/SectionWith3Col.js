import React from 'react';
import classNames from 'classnames';
import styles from './SectionWith3Col.module.scss';
import Button from '../Button';

const SectionWith3Col = ({ heading, columns, className }) => {
  if (!heading || !columns || columns.length < 1) return <></>;
  return (
    <section className={classNames('section', className)}>
      <div className="container">
        <h2 className={styles.heading}>{heading}</h2>
        <div className={classNames('wrapper', styles.wrapper)}>
          {columns.map(column => (
            <IconBox
              icon={column.icon.publicURL}
              heading={column.heading}
              description={column.description}
              cta={column.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const IconBox = ({ icon, heading, description, cta }) => (
  <div className={classNames('box', styles.box)}>
    <figure className="image">
      <img className={styles.image} src={icon} alt={`Icon for ${heading}`} />
    </figure>
    <h3 className={styles.heading}>{heading}</h3>
    <p className={styles.description}>{description}</p>
    {cta ? (
      <Button
        className={classNames('is-transparent medium', styles.button)}
        text="Les mer"
        link={cta}
      />
    ) : (
      <></>
    )}
  </div>
);

export default SectionWith3Col;
