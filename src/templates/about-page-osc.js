import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import NonStretchedImage from '../components/NonStretchedImage';
import StretchedImage from '../components/StretchedImage';

export const AboutPageOSCTemplate = ({
  content,
  contentComponent,
  heading,
  subheading,
  featuredImage,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section has-dark-background">
      <div className="container">
        <h1>{heading}</h1>
        <p2>{subheading}</p2>
        <section id="about--image" className="has-dark-background">
          <div className="about-image">
            <StretchedImage
              fluid={featuredImage.childImageSharp.fluid}
              objectFit="contain"
              alt="About image"
              className="image"
            />
          </div>
        </section>
        <PostContent content={content} />
      </div>
    </section>
  );
};

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  if (!frontmatter) return <></>;
  const {
    title,
    heading,
    subheading,
    seoDescription,
    featuredImage,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPageOSCTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        subheading={subheading}
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
        subheading
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
