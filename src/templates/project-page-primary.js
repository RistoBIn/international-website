import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import KeyProjectFactors from '../components/KeyProjectFactors';
import PartnersFooter from '../components/PartnersFooter';
import Title from '../components/Title';

export const ProjectPageTemplate = ({
  content,
  contentComponent,
  heading,
  subheading,
  featuredImage,
  keyFactors,
  partners,
  featuredImageCaption,
}) => {
  const PostContent = contentComponent || Content;
  return (
    <div className="section has-dark-background">
      <div
        id="project-page-primary"
        className="wrapper section has-dark-background"
      >
        <section
          id="project-page-heading"
          className="header has-dark-background"
        >
          <Title
            id="project-page-title"
            title={heading}
            description={subheading}
            position="left"
          />
        </section>
        <section
          id="key-project-factors"
          className="sidebar has-dark-background"
        >
          <KeyProjectFactors keyFactors={keyFactors} />
        </section>
        <section id="project-content" className="content has-dark-background">
          <figure className="figure">
            <Img
              fluid={featuredImage.childImageSharp.fluid}
              objectFit="contain"
              alt="Product image"
              className="image"
            />
            <figcaption id="project-image-caption">
              {featuredImageCaption}
            </figcaption>
          </figure>
          <PostContent id="project-page-post-content" content={content} />
        </section>
        <PartnersFooter
          partners={partners}
          className="partners is-hidden-mobile"
        />
      </div>
    </div>
  );
};

const ProjectPage = ({ data }) => {
  const { frontmatter, html } = data.index;
  if (!frontmatter) return <></>;
  const {
    title,
    seoDescription,
    heading,
    featuredImageCaption,
    keyFactors,
    partners,
    subheading,
    featuredImage,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProjectPageTemplate
        content={html}
        contentComponent={HTMLContent}
        heading={heading}
        subheading={subheading}
        featuredImage={featuredImage}
        keyFactors={keyFactors}
        partners={partners}
        featuredImageCaption={featuredImageCaption}
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
          }
        }
        partners {
          heading
          partnerItems {
            description
            icon {
              publicURL
              extension
              childImageSharp {
                fluid(maxWidth: 405, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  presentationWidth
                }
              }
            }
          }
        }
        title
        templateKey
        seoDescription
        subheading
      }
    }
  }
`;
