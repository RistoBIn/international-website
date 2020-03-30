import React from 'react';
import classNames from 'classnames';
import styles from './SectionWith3Col.module.scss';
import Button from '../Button';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';
import { idMaker } from '../../utils/id-maker';

const gen = idMaker();

const SectionWith3Col = ({ heading, columns, className }) => {
  if (!columns || columns.length < 1) return <></>;

  return (
    <section className={classNames(className)}>
      <div className="container">
        {heading ? <h2 className={styles.heading}>{heading}</h2> : <></>}
        <div className={classNames('wrapper', styles.wrapper)}>
          {columns.map(column => (
            <IconBox
              key={gen.next().value}
              icon={column.icon.publicURL}
              heading={column.heading}
              content={column.description || column.content}
              cta={column.cta}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const IconBox = ({ icon, heading, content, cta }) => {
  const PostContent = HTMLContent || Content;
  return (
    <div className={classNames('box', styles.box)}>
      <figure className="image">
        <img className={styles.image} src={icon} alt={`Icon for ${heading}`} />
      </figure>

      {heading ? <h3 className={styles.heading}>{heading}</h3> : <></>}
      <PostContent
        content={generateHTML(content)}
        className={classNames(styles.description, 'content')}
      />
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
};

export default SectionWith3Col;
