import React from 'react';
import classNames from 'classnames';
import { StaticQuery, graphql } from 'gatsby';

import styles from './RecentArticles.module.scss';
import 'moment/locale/nb';

import Button from '../Button';
import ArticleTile from '../Articles/ArticleTile';

const RecentArticlesTemplate = ({ articles }) => {
  const { edges } = articles;

  if (edges && edges.length > 0) {
    return (
      <>
        <section
          id="related-articles"
          className={classNames('section', 'is-medium', styles.section)}
        >
          <div className="container">
            <h3 className={styles.heading}>Få med deg det siste fra SEALAB</h3>
            <hr />
            <div className="columns">
              {edges.map((edge, index) => {
                const { node: article } = edge;
                const path = article.fields.slug;
                const { frontmatter } = article;

                if (index < 3) {
                  return (
                    <ArticleTile
                      key={article.title}
                      keyName={frontmatter.title}
                      title={frontmatter.heading}
                      image={frontmatter.featuredimage.childImageSharp.fluid}
                      date={frontmatter.date}
                      path={path}
                    />
                  );
                }
                return <></>;
              })}
            </div>

            <Button
              className={classNames(
                'is-transparent',
                'has-white-background',
                'medium',
                styles.button,
              )}
              text="Se alle artikler"
              link="/blogg"
            />
          </div>
        </section>
      </>
    );
  }
  return <></>;
};

const RecentArticles = ({ props }) => {
  return (
    <StaticQuery
      query={graphql`
        query BlogArticlesQuery {
          blogArticles: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  heading
                  date
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 450, maxHeight: 270) {
                        ...GatsbyImageSharpFluid_tracedSVG
                      }
                    }
                  }
                  description
                }
              }
            }
          }
        }
      `}
      render={data => (
        <RecentArticlesTemplate articles={data.blogArticles} {...props} />
      )}
    />
  );
};

export default RecentArticles;
