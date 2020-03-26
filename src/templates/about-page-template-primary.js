import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const AboutPageOSCTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredImage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <section className="section has-dark-background about-page-template">
        <div className="container title">
          <h1>{heading}</h1>
        </div>
        <div className="container content">
          <p>{description}</p>
        </div>
      </section>
      <section className="has-dark-background about-page-template">
        <div className="about-page-template-image">
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            alt="About image"
            className="image"
          />
        </div>
      </section>
      <section className="section has-dark-background about-page-template">
        <div className="container content">
          <PostContent content={content} />
        </div>
      </section>
    </>
  );
};

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredImage,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageOSCTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredImage={featuredImage}
      />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageOSCById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        heading
        description
        seoDescription
        featuredImage {
          childImageSharp {
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
      }
    }
  }
`;
