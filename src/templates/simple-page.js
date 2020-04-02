import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const SimplePageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section has-dark-background">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

SimplePageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  heading: PropTypes.string,
  helmet: PropTypes.object,
};

const SimplePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout
      seoDescription={post.frontmatter.seoDescription}
      seoTitle={post.frontmatter.title}
    >
      <SimplePageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        heading={post.frontmatter.heading}
      />
    </Layout>
  );
};

SimplePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default SimplePage;

export const pageQuery = graphql`
  query SimplePageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        heading
        seoDescription
      }
    }
  }
`;
