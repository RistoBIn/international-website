import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const SolutionPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section has-dark-background">
      <div className="container">
        <h1>{heading}</h1>
        <p>{description}</p>
        <p>This is soution-page-secondary</p>
        <PostContent content={content} />
      </div>
    </section>
  );
};

const SolutionPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const { title, seoDescription, heading, description } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <SolutionPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
      />
    </Layout>
  );
};

export default SolutionPage;

export const pageQuery = graphql`
  query SolutionPageSecondaryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
      }
    }
  }
`;
