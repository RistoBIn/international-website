import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const PartnershipPagePrimaryTemplate = ({
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
        <div className="container centered has-text-centered">
          <h1 className="section--title has-text-centered">{heading}</h1>
          <p className="section--description has-text-centered">
            {description}
          </p>
        </div>
      </section>
      <section className="section has-dark-background about-page-primary">
        <div className="container about-page-primary-image">
          <Img
            fluid={featuredImage.childImageSharp.fluid}
            alt="About image"
            className="image full-width"
          />
        </div>
      </section>
      <section className="section has-dark-background about-page-primary">
        <div className="container">
          <PostContent
            content={content}
            className="content is-left-aligned links-are-buttons"
          />
        </div>
      </section>
    </>
  );
};

const PartnershipPage = ({ data }) => {
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
      <PartnershipPagePrimaryTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        featuredImage={featuredimage}
      />
    </Layout>
  );
};

export default PartnershipPage;

export const pageQuery = graphql`
  query PartnershipPagePrimaryTemplateById($id: String!) {
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
            fluid(maxHeight: 600, quality: 80) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
        featuredimageSection {
          content
          buttons {
            path
            text
          }
        }
        splitSection {
          subheading
          content
          featuredimage {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 600, quality: 80) {
                ...GatsbyImageSharpFluid_noBase64
                presentationWidth
              }
            }
          }
        }
        features {
          content
          items {
            heading
            icon {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 100, quality: 50) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
            description
          }
        }
        partnering {
          heading
          subheading
          buttons {
            path
            text
          }
          items {
            logo {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 300, quality: 50) {
                  ...GatsbyImageSharpFluid_noBase64
                  presentationWidth
                }
              }
            }
            content
          }
        }
      }
    }
  }
`;
