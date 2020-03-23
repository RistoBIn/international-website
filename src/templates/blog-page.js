import React from 'react';
import moment from 'moment';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Link from '../components/Link';
import SEO from '../components/SEO';
import ArticleTile from '../components/Articles/ArticleTile';
import 'moment/locale/nb';

const BlogIndexPageTemplate = ({ articles, title, heading }) => {
  const articlesCopy = articles;
  const { node: featuredArticle } = articlesCopy[0];

  return (
    <Layout>
      <SEO title={title} />
      <section
        id="articles-header"
        className="articles section has-dark-background"
      >
        <div className="container">
          <div className="columns reverse-row-order">
            <h1 className="has-text-centered is-hidden-desktop">{heading}</h1>
            <div className="column is-4 featured-content-header">
              <h1 className="is-hidden-touch">{heading}</h1>
              <FeaturedArticleContent
                date={featuredArticle.frontmatter.date}
                title={featuredArticle.frontmatter.heading}
                description={featuredArticle.frontmatter.description}
                buttonLink={featuredArticle.fields.slug}
              >
                Les mer
              </FeaturedArticleContent>
            </div>
            <div className="featured-image featured-image-header column is-8">
              <Img
                fluid={
                  featuredArticle.frontmatter.featuredimage.childImageSharp
                    .fluid
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="articles section">
        <div className="container">
          <div className="columns is-multiline">
            {articles.map((edge, index) => {
              const { node: article } = edge;
              const path = article.fields.slug;
              const { frontmatter } = article;
              if (index === 0) return <></>;
              return (
                <ArticleTile
                  key={article.title}
                  keyName={frontmatter.title}
                  title={frontmatter.heading}
                  image={frontmatter.featuredimage.childImageSharp.fluid}
                  date={frontmatter.date}
                  outerClass="is-4"
                  path={path}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const FeaturedArticleContent = ({
  date,
  title,
  description,
  children,
  buttonLink,
}) => (
  <div className="featured-content has-white-background">
    <p className="date">{`${moment(date)
      .locale('nb')
      .calendar()}`}</p>
    <h2>{title}</h2>
    <p className="description">{description}</p>
    <Link className="has-white-background" to={buttonLink}>
      {children}
    </Link>
  </div>
);

const BlogPage = ({ data }) => {
  const { index: post } = data;
  const articles = data.blogArticles.edges;

  return (
    <>
      <BlogIndexPageTemplate
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        articles={articles}
      />
    </>
  );
};

export const BlogPageQuery = graphql`
  query BlogPageQuery($id: String!) {
    index: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        heading
      }
    }
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
                fluid(maxWidth: 1180) {
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
`;

export default BlogPage;
