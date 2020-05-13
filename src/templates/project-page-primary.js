import React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import KeyProjectFactors from '../components/KeyProjectFactors';
import PartnersFooter from '../components/PartnersFooter';

export const ProjectPageTemplate = ({
  content,
  contentComponent,
  heading,
  description,
  featuredImage,
  keyFactors,
  partners,
  featuredImageCaption,
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section id="project-page-primary" className="section has-dark-background ">
      <div className="container wrapper">
        <section className="header">
          <h1 className="section--title">{heading}</h1>
          <p className="section--description">{description}</p>
        </section>

        <aside className="sidebar">
          <KeyProjectFactors keyFactors={keyFactors} />
        </aside>
        <section className="content has-dark-background">
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
          <PostContent id="content" content={content} />
        </section>

        <PartnersFooter
          partners={partners}
          className="partners is-hidden-mobile"
        />
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
    featuredImageCaption,
    keyFactors,
    partners,
    description,
    featuredImage,
  } = frontmatter;

  return (
    <Layout seoTitle={title} seoDescription={seoDescription}>
      <ProjectPageTemplate
        content={html}
        contentComponent={HTMLContent}
        heading={heading}
        description={description}
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
        title
        seoDescription
        heading
        description

        featuredImage {
          childImageSharp {
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
              presentationWidth
            }
          }
        }
        featuredImageCaption
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
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  presentationWidth
                }
              }
            }
          }
        }
      }
    }
  }
`;
