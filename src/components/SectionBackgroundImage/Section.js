import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import styles from './Section.module.scss';
import Title from '../Title';

const ArrowRight = () => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.53033 6.53033C9.82322 6.23744 9.82322 5.76256 9.53033 5.46967L4.75736 0.696699C4.46447 0.403806 3.98959 0.403806 3.6967 0.696699C3.40381 0.989593 3.40381 1.46447 3.6967 1.75736L7.93934 6L3.6967 10.2426C3.40381 10.5355 3.40381 11.0104 3.6967 11.3033C3.98959 11.5962 4.46447 11.5962 4.75736 11.3033L9.53033 6.53033ZM0 6.75H9V5.25H0V6.75Z"
      fill="white"
    />
  </svg>
);

const Section = ({
  heading,
  subheading,
  description,
  bgimage,
  backgroundCSS,
  button,
}) => {
  if (!(typeof bgimage === 'string') && !bgimage.publicURL) return <></>;
  const bgCSS = backgroundCSS || `url(${bgimage.publicURL})`;
  const { text, path } = button;

  return (
    <section
      className={classNames(
        'section',
        'is-large',
        'has-text-centered',
        styles.section,
      )}
      style={{
        background: bgCSS,
      }}
    >
      <div className="container">
        <div className={classNames(styles.content)}>
          <Title
            title={heading}
            subtitle={subheading}
            description={description}
            position="center"
          />
          <Link to={path} className={classNames('is-link')}>
            <span>{text}</span>
            <span className={styles.link__icon}>
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section;
