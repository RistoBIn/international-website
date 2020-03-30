import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const AboutPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background about-page-primary">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="section has-dark-background about-page-primary">
        <div className="container">
          <PostContent content={content} className="content is-left-aligned" />
        </div>
      </section>
    </>
  );
};

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const { title, heading, description, seoDescription } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
      />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query aboutPageTertiaryTemplateById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
