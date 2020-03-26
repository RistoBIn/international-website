import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Hero from '../components/Hero';
import SectionList from '../components/SectionList';

export const SolutionPageTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  splitSections,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="has-dark-background">
      <Hero heading={heading} description={description} />
      <SectionList items={splitSections} />
      <section className="section">
        <div className="container">array section</div>
      </section>
      <section className="section has-dark-background">
        <div className="container content is-left-aligned">
          <PostContent content={content} />
        </div>
      </section>
    </section>
  );
};

const SolutionPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    splitSections,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <SolutionPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        splitSections={splitSections}
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
        heading
        seoDescription
        description
        splitSections {
          heading
          content
          subheading
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
