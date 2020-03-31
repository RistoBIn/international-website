import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import NonStretchedImage from '../components/NonStretchedImage';
import Content, { HTMLContent } from '../components/Content';

export const AboutPagePartnersTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  partnerItems,
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section className="has-dark-background about-page-partners">
      <section className="section">
        <div className="container">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </div>
      </section>
      <section className="section logo-section">
        <div className="container">
          <div className="wrapper">
            {partnerItems.map(partner => (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="image"
              >
                <NonStretchedImage
                  alt=""
                  objectFit="contain"
                  className="image"
                  {...partner.icon}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section has-dark-background">
        <div className="container">
          <PostContent content={content} className="content is-left-aligned" />
        </div>
      </section>
    </section>
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
    partnerItems,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <AboutPagePartnersTemplate
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        partnerItems={partnerItems}
      />
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query aboutPagePartnersTemplateById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seoDescription
        description
        heading
        partnerItems {
          icon {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 405, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
          url
        }
      }
    }
  }
`;
