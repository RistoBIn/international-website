import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import NonStretchedImage from '../components/NonStretchedImage';

export const AboutPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredimage,
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
      {featuredimage ? (
        <section className="section has-dark-background about-page-primary">
          <div className="container">
            <NonStretchedImage
              fluid={featuredimage.childImageSharp.fluid}
              objectFit="contain"
              alt="SEALABs leadership"
              className="image"
            />
          </div>
        </section>
      ) : (
        <></>
      )}
      <section className="section has-dark-background about-page-primary">
        <div className="container">
          <PostContent content={content} className="content" />
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
      <AboutPageTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredimage={featuredimage}
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
        seoDescription
        heading
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1410, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
      }
    }
  }
`;
