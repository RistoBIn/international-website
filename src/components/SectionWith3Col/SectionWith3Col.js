import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import generateHTML from '../../utils/generateHTML';
import Content, { HTMLContent } from '../Content';
import { idMaker } from '../../utils/id-maker';
import styles from './SectionWith3Col.module.scss';

const gen = idMaker();

const SectionWith3Col = ({
  heading,
  description,
  columns,
  className,
  position = 'center',
}) => {
  if (!columns || columns.length < 1) return <></>;

  return (
    <section className={classNames(className)}>
      <div className="container">
        {heading ? <h2 className={styles.heading}>{heading}</h2> : <></>}
        {description ? (
          <p className={classNames(styles.description, 'big-paragraph')}>
            {description}
          </p>
        ) : (
          <></>
        )}
        <div className={classNames('wrapper', styles.wrapper)}>
          {columns.map(column => (
            <IconBox
              key={gen.next().value}
              icon={column.icon.publicURL}
              heading={column.heading}
              content={column.description || column.content}
              cta={column.cta}
              className={classNames(className, {
                [styles.is_left]: position === 'left',
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const IconBox = ({ icon, heading, content, cta, className }) => {
  const PostContent = HTMLContent || Content;
  return (
    <div className={classNames('box', styles.box, className)}>
      <figure className="image">
        <img className={styles.image} src={icon} alt={`Icon for ${heading}`} />
      </figure>

      {heading ? <h3 className={styles.box__heading}>{heading}</h3> : <></>}
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
