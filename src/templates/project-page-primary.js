import React from 'react';

import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import NonStretchedImage from '../components/NonStretchedImage';

const KeyFactors = ({ keyFactors }) => {
  return (
    <div id="key-factors" className="wrapper">
      <h3>{keyFactors.heading}</h3>
      <div id="key-factors" className="columns">
        {keyFactors.factorItems.map(factor => (
          <div className="features-icons-item column is-3">
            <figure className="image">
              <img
                src={factor.icon.publicURL}
                alt="Icon"
                style={{ height: 50 }}
              />
            </figure>
            <p>{factor.primaryInfo}</p>
            <p>{factor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Partners = ({ partners }) => {
  return (
    <div id="partners" className="wrapper">
      <h3>{partners.heading}</h3>
      <div id="partners" className="columns">
        {partners.partnerItems.map(partner => (
          <div className="features-icons-item column is-3">
            <figure className="image">
              <img
                src={partner.icon.publicURL}
                alt="Icon"
                style={{ height: 50 }}
              />
            </figure>
            <p>{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectPageTemplate = ({
  content,
  contentComponent,
  heading,
  subHeading,
  featuredImage,
  primarySection,
  keyFactors,
  partners,
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section className="section has-dark-background">
      <div className="container">
        <h1>{heading}</h1>
        <p>{subHeading}</p>
        <section id="project-image" className="has-dark-background">
          <div className="product-image">
            <NonStretchedImage
              fluid={featuredImage.childImageSharp.fluid}
              objectFit="contain"
              alt="Product image"
              className="image"
            />
          </div>
        </section>
        <h1>{primarySection.heading}</h1>
        {primarySection.subsections.map(paragraph => (
          <div className="primary-subsections">
            <p>{paragraph.description}</p>
          </div>
        ))}
        <section id="primary-section" className="has-dark-background">
          <p>{primarySection.description}</p>
        </section>
        <KeyFactors keyFactors={keyFactors} />
        <PostContent content={content} />
        <Partners partners={partners} />
      </div>
    </section>
  );
};

const ProjectPage = ({ data }) => {
  const { frontmatter, html } = data.index;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    description,
    featuredImageCaption,
    keyFactors,
    partners,
    primarySection,
    subHeading,
    featuredImage,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProjectPageTemplate
        content={html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
        subHeading={subHeading}
        featuredImage={featuredImage}
        primarySection={primarySection}
        keyFactors={keyFactors}
        partners={partners}
      />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    index: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        description
        featuredImage {
          childImageSharp {
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_noBase64
              presentationWidth
            }
          }
        }
        featuredImageCaption
        heading
        keyFactors {
          heading
          factorItems {
            description
            primaryInfo
            secondaryInfo
            icon {
              extension
              publicURL
            }
          }
        }
        partners {
          heading
          partnerItems {
            description
            icon {
              extension
              publicURL
            }
          }
        }
        primarySection {
          heading
          subsections {
            description
          }
        }
        title
        templateKey
        seoDescription
        subHeading
      }
    }
  }
`;
