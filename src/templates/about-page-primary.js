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
      <section className="section has-dark-background about-page-primary">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="has-dark-background about-page-primary">
        <div className="about-page-primary-image">
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            alt="About image"
            className="image"
          />
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
  const {
    title,
    heading,
    description,
    seoDescription,
    featuredimage,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageOSCTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredImage={featuredimage}
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
        featuredimage {
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
